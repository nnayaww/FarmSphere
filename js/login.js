document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Retrieve form fields
      const emailField = document.getElementById('email');
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

      try {
        // Sign in with email and password
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'An error occurred during login.';

        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password.';
            break;
          default:
            errorMessage = error.message;
        }

        alert(errorMessage);
      }
    });
  }

  // Google signup button
  const googleLoginBtn = document.querySelector('.google-signup');
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async function () {
      try {
        console.log('Starting Google login...');
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        // Set custom parameters
        provider.setCustomParameters({
          prompt: 'select_account'
        });

        console.log('Opening Google popup...');
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('Google login successful:', result);

        const user = result.user;
        console.log('User data:', user);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } catch (error) {
        console.error('Google login error details:', {
          code: error.code,
          message: error.message,
          stack: error.stack
        });

        let errorMessage = 'An error occurred during Google login.';
        switch (error.code) {
          case 'auth/popup-blocked':
            errorMessage = 'Please allow popups for this site to sign in with Google.';
            break;
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in was cancelled. Please try again.';
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = 'Another sign-in request is in progress.';
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
            break;
          default:
            errorMessage = error.message || 'An error occurred during Google login.';
        }

        alert(errorMessage);
      }
    });
  }

  // Apple signup button
  const appleLoginBtn = document.querySelector('.apple-signup');
  if (appleLoginBtn) {
    appleLoginBtn.addEventListener('click', async function () {
      try {
        console.log('Starting Apple login...');
        const provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');

        console.log('Opening Apple popup...');
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('Apple login successful:', result);

        const user = result.user;
        console.log('User data:', user);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } catch (error) {
        console.error('Apple login error details:', {
          code: error.code,
          message: error.message,
          stack: error.stack
        });

        let errorMessage = 'An error occurred during Apple login.';
        switch (error.code) {
          case 'auth/popup-blocked':
            errorMessage = 'Please allow popups for this site to sign in with Apple.';
            break;
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in was cancelled. Please try again.';
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = 'Another sign-in request is in progress.';
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
            break;
          default:
            errorMessage = error.message || 'An error occurred during Apple login.';
        }

        alert(errorMessage);
      }
    });
  }

  // Check for OAuth callback token
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token) {
    localStorage.setItem('token', token);
    window.location.href = 'dashboard.html';
  }
});
