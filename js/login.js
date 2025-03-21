document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailField = document.getElementById('email');
      const passwordField = document.getElementById('password');
      // const agreeTerms = document.getElementById('agreeTerms').checked;

      let isValid = true;

      // Form validation
      if (!emailField.value || !passwordField.value) {
        emailField.classList.add("shake");
        passwordField.classList.add("shake");
        isValid = false;
      }

      // if (!agreeTerms) {
      //   alert('Please agree to the Terms & Conditions');
      //   return;
      // }

      // Remove shake effect after animation completes
      setTimeout(() => {
        emailField.classList.remove("shake");
        passwordField.classList.remove("shake");
      }, 800);

      if (!isValid) return;

      // Simulate successful login and redirect
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = "dashboard.html";
    });
  }

  // Google signup button
  const googleSignupBtn = document.querySelector('.google-signup');
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', function () {
      console.log('Google signup clicked');
      alert('Google signup feature would connect to Google OAuth here');
    });
  }

  // Apple signup button
  const appleSignupBtn = document.querySelector('.apple-signup');
  if (appleSignupBtn) {
    appleSignupBtn.addEventListener('click', function () {
      console.log('Apple signup clicked');
      alert('Apple signup feature would connect to Apple Sign In here');
    });
  }
});
