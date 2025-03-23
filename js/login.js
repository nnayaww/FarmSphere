document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Retrieve form fields
      const emailField = document.getElementById('email');
      // Using the password field with id "password"
      const passwordField = document.getElementById('password');

      const email = emailField.value.trim();
      const password = passwordField.value;

      // Basic form validation
      if (!email || !password) {
        emailField.classList.add("shake");
        passwordField.classList.add("shake");
        setTimeout(() => {
          emailField.classList.remove("shake");
          passwordField.classList.remove("shake");
        }, 800);
        alert("Please fill in both email and password.");
        return;
      }

      

      // Prepare payload for login
      const payload = { email, password };

      try {
        // Send POST request to the login endpoint
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || 'Invalid credentials');
          return;
        }

        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        window.location.href = "dashboard.html";
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
      }
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
