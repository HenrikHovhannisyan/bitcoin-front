document.addEventListener("DOMContentLoaded", () => {
  const signinBtn = document.getElementById("signin-btn");
  const registerBtn = document.getElementById("register-btn");
  const signinForm = document.getElementById("signin-form");
  const registerForm = document.getElementById("register-form");

  const registerUsername = registerForm.querySelector(
    'input[placeholder="Username"]'
  );
  const registerPassword = registerForm.querySelector(
    'input[placeholder="Password"]'
  );
  const registerConfirmPassword = registerForm.querySelector(
    'input[placeholder="Confirm Password"]'
  );
  const registerSubmitBtn = registerForm.querySelector('button[type="submit"]');

  const signinUsername = signinForm.querySelector(
    'input[placeholder="Username"]'
  );
  const signinPassword = signinForm.querySelector(
    'input[placeholder="Password"]'
  );
  const signinSubmitBtn = signinForm.querySelector('button[type="submit"]');

  const usernameError = document.createElement("div");
  usernameError.className = "error-message";
  registerUsername.insertAdjacentElement("afterend", usernameError);

  const passwordError = document.createElement("div");
  passwordError.className = "error-message";
  registerPassword.insertAdjacentElement("afterend", passwordError);

  const confirmPasswordError = document.createElement("div");
  confirmPasswordError.className = "error-message";
  registerConfirmPassword.insertAdjacentElement(
    "afterend",
    confirmPasswordError
  );

  const signinUsernameError = document.createElement("div");
  signinUsernameError.className = "error-message";
  signinUsername.insertAdjacentElement("afterend", signinUsernameError);

  const signinPasswordError = document.createElement("div");
  signinPasswordError.className = "error-message";
  signinPassword.insertAdjacentElement("afterend", signinPasswordError);

  function toggleForms(activeBtn, inactiveBtn, showForm, hideForm) {
    activeBtn.classList.add("active");
    inactiveBtn.classList.remove("active");
    showForm.classList.remove("hidden");
    hideForm.classList.add("hidden");
    clearErrors();
  }

  function clearErrors() {
    usernameError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    signinUsernameError.textContent = "";
    signinPasswordError.textContent = "";
    registerUsername.classList.remove("is-invalid");
    registerPassword.classList.remove("is-invalid");
    registerConfirmPassword.classList.remove("is-invalid");
    signinUsername.classList.remove("is-invalid");
    signinPassword.classList.remove("is-invalid");
    registerUsername.classList.remove("is-valid");
    registerPassword.classList.remove("is-valid");
    registerConfirmPassword.classList.remove("is-valid");
    signinUsername.classList.remove("is-valid");
    signinPassword.classList.remove("is-valid");
  }

  function checkUsernameExists(username) {
    return username.toLowerCase() === "admin";
  }

  function validateUsername() {
    const username = registerUsername.value.trim();
    let isValid = true;

    if (username.length < 8) {
      usernameError.textContent = "Username must contain at least 8 characters";
      registerUsername.classList.add("is-invalid");
      registerUsername.classList.remove("is-valid");
      isValid = false;
    } else if (checkUsernameExists(username)) {
      usernameError.textContent = "Username already exists";
      registerUsername.classList.add("is-invalid");
      registerUsername.classList.remove("is-valid");
      isValid = false;
    } else {
      usernameError.textContent = "";
      registerUsername.classList.remove("is-invalid");
      registerUsername.classList.add("is-valid");
    }

    return isValid;
  }

  function validatePassword() {
    const password = registerPassword.value;
    let isValid = true;
    let errorMessage = "";

    if (password.length < 8) {
      errorMessage = "Password must contain at least 8 characters";
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      errorMessage = "Password must contain at least 1 uppercase letter";
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      errorMessage = "Password must contain at least 1 lowercase letter";
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      errorMessage = "Password must contain at least 1 number";
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      errorMessage =
        "Password must contain at least 1 special character from !@#$%^&*";
      isValid = false;
    }

    if (!isValid) {
      passwordError.textContent = errorMessage;
      registerPassword.classList.add("is-invalid");
      registerPassword.classList.remove("is-valid");
    } else {
      passwordError.textContent = "";
      registerPassword.classList.remove("is-invalid");
      registerPassword.classList.add("is-valid");
    }

    return isValid;
  }

  function validateConfirmPassword() {
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;
    let isValid = true;

    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match";
      registerConfirmPassword.classList.add("is-invalid");
      registerConfirmPassword.classList.remove("is-valid");
      isValid = false;
    } else if (confirmPassword === "") {
      confirmPasswordError.textContent = "Please confirm your password";
      registerConfirmPassword.classList.add("is-invalid");
      registerConfirmPassword.classList.remove("is-valid");
      isValid = false;
    } else {
      confirmPasswordError.textContent = "";
      registerConfirmPassword.classList.remove("is-invalid");
      registerConfirmPassword.classList.add("is-valid");
    }

    return isValid;
  }

  function validateSigninUsername() {
    const username = signinUsername.value.trim();
    let isValid = true;

    if (username === "") {
      signinUsernameError.textContent = "Please enter your username";
      signinUsername.classList.add("is-invalid");
      signinUsername.classList.remove("is-valid");
      isValid = false;
    } else {
      signinUsernameError.textContent = "";
      signinUsername.classList.remove("is-invalid");
      signinUsername.classList.add("is-valid");
    }

    return isValid;
  }

  function validateSigninPassword() {
    const password = signinPassword.value;
    let isValid = true;

    if (password === "") {
      signinPasswordError.textContent = "Please enter your password";
      signinPassword.classList.add("is-invalid");
      signinPassword.classList.remove("is-valid");
      isValid = false;
    } else {
      signinPasswordError.textContent = "";
      signinPassword.classList.remove("is-invalid");
      signinPassword.classList.add("is-valid");
    }

    return isValid;
  }

  registerUsername.addEventListener("input", validateUsername);
  registerPassword.addEventListener("input", validatePassword);
  registerConfirmPassword.addEventListener("input", validateConfirmPassword);
  signinUsername.addEventListener("input", validateSigninUsername);
  signinPassword.addEventListener("input", validateSigninPassword);

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
      alert("Registration successful!");
      registerForm.reset();
      clearErrors();
      toggleForms(signinBtn, registerBtn, signinForm, registerForm);
    }
  });

  signinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isUsernameValid = validateSigninUsername();
    const isPasswordValid = validateSigninPassword();

    if (isUsernameValid && isPasswordValid) {
      alert("Login successful!");
      signinForm.reset();
      clearErrors();
    }
  });

  signinBtn.addEventListener("click", () => {
    toggleForms(signinBtn, registerBtn, signinForm, registerForm);
  });

  registerBtn.addEventListener("click", () => {
    toggleForms(registerBtn, signinBtn, registerForm, signinForm);
  });
});
