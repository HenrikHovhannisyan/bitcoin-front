/* Start signin signup page */
document.addEventListener("DOMContentLoaded", () => {
  const signinBtn = document.getElementById("signin-btn");
  const registerBtn = document.getElementById("register-btn");
  const signinForm = document.getElementById("signin-form");
  const registerForm = document.getElementById("register-form");

  function toggleForms(activeBtn, inactiveBtn, showForm, hideForm) {
    activeBtn.classList.add("active");
    inactiveBtn.classList.remove("active");
    showForm.classList.remove("hidden");
    hideForm.classList.add("hidden");
  }

  signinBtn.addEventListener("click", () => {
    toggleForms(signinBtn, registerBtn, signinForm, registerForm);
  });

  registerBtn.addEventListener("click", () => {
    toggleForms(registerBtn, signinBtn, registerForm, signinForm);
  });
});

/* End signin signup page */
