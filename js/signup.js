// Form elements
const signupForm = document.getElementById('signupForm');
const googleSignupBtn = document.querySelector('.google-signup');
const appleSignupBtn = document.querySelector('.apple-signup');

// Handle form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsChecked = document.getElementById('terms').checked;

    // Form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (!termsChecked) {
        alert('Please agree to the Terms and Conditions');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Password strength validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    try {
        // Create user with email and password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update user profile with first and last name
        await user.updateProfile({
            displayName: `${firstName} ${lastName}`
        });

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));

        // Show success message
        alert('Account created successfully!');

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Signup error:', error);
        let errorMessage = 'An error occurred during signup.';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Please choose a stronger password.';
                break;
            default:
                errorMessage = error.message;
        }

        alert(errorMessage);
    }
});

// Handle Google Signup
googleSignupBtn.addEventListener('click', async () => {
    try {
        console.log('Starting Google signup...');
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        // Set custom parameters
        provider.setCustomParameters({
            prompt: 'select_account'
        });

        console.log('Opening Google popup...');
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('Google signup successful:', result);

        const user = result.user;
        console.log('User data:', user);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        }));

        // Show success message
        alert('Successfully signed in with Google!');

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Google signup error details:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });

        let errorMessage = 'An error occurred during Google signup.';
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
                errorMessage = error.message || 'An error occurred during Google signup.';
        }

        alert(errorMessage);
    }
});

// Handle Apple Signup
appleSignupBtn.addEventListener('click', async () => {
    try {
        const provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');

        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));

        // Show success message
        alert('Successfully signed in with Apple!');

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Apple signup error:', error);
        alert(error.message || 'An error occurred during Apple signup.');
    }
});
