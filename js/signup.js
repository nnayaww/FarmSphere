document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const termsChecked = document.getElementById('agreeTerms').checked;

      // Form validation
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if (!termsChecked) {
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

      // Combine first and last name to create the username
      const username = `${firstName} ${lastName}`;

      // Create the payload that the backend expects
      const payload = { username, email, password };

      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          // Display error message from the server
          alert(data.message || 'Error creating account');
          return;
        }

        // Optionally, store the token in localStorage if needed
        localStorage.setItem('token', data.token);
        alert('Account created successfully!');
        // Redirect to login page
        window.location.href = '../pages/login.html';
      } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }

  // Google signup button
  const googleSignupBtn = document.querySelector('.google-signup');
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', function () {
      console.log('Google signup clicked');
      // Implement OAuth or similar integration here
      alert('Google signup feature would connect to Google OAuth here');
    });
  }
});
