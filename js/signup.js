
document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const termsCheck = document.getElementById('agreeTerms').value;
      console.log(termsCheck)

      // Form validation
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if (!termsCheck) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      // Password strength validation
      if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
      }

      // Here you would normally send the data to a server
      console.log('Signup attempt:', { firstName, lastName, email, password });

      // Simulate successful signup and redirect
      localStorage.setItem('isSignedUp', 'true');
      window.location.href = '../pages/login.html';
    });
  }

  // Google signup button
  const googleSignupBtn = document.querySelector('.google-signup');
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', function () {
      console.log('Google signup clicked');
      // Here you would implement OAuth or similar
      alert('Google signup feature would connect to Google OAuth here');
    });
  }
});
