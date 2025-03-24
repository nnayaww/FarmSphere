document.addEventListener('DOMContentLoaded', function () {
    // Get Firebase auth instance
    const auth = firebase.auth();
    const storage = firebase.storage();

    // Check if user is logged in
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in
            updateProfileUI(user);
        } else {
            // User is signed out, redirect to login
            window.location.href = 'login.html';
        }
    });

    // Profile form submission
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const location = document.getElementById('location').value;
                const bio = document.getElementById('bio').value;
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;

                // Update user profile
                const user = firebase.auth().currentUser;
                if (!user) {
                    throw new Error('No user logged in');
                }

                // Update display name
                await user.updateProfile({
                    displayName: `${firstName} ${lastName}`
                });

                // Update password if provided
                if (currentPassword && newPassword && confirmPassword) {
                    if (newPassword !== confirmPassword) {
                        throw new Error('New passwords do not match');
                    }
                    // Reauthenticate user before password change
                    const credential = firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        currentPassword
                    );
                    await user.reauthenticateWithCredential(credential);
                    await user.updatePassword(newPassword);
                }

                // Update user data in localStorage
                const userData = {
                    firstName,
                    lastName,
                    email,
                    phone,
                    location,
                    bio,
                    displayName: `${firstName} ${lastName}`
                };
                localStorage.setItem('userData', JSON.stringify(userData));

                // Show success message
                showMessage('Profile updated successfully!', 'success');

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                console.error('Error updating profile:', error);
                showMessage(error.message || 'Error updating profile. Please try again.', 'error');
            }
        });
    }

    // Profile picture upload
    const photoInput = document.getElementById('photoInput');
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const coverInput = document.getElementById('coverInput');
    const changeCoverBtn = document.getElementById('changeCoverBtn');

    if (changePhotoBtn && photoInput) {
        changePhotoBtn.addEventListener('click', () => {
            photoInput.click();
        });

        photoInput.addEventListener('change', async function (e) {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error('No user logged in');
                }

                // Show loading message
                showMessage('Uploading profile picture...', 'info');

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    throw new Error('Please select an image file');
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error('File size should be less than 5MB');
                }

                // Create a unique filename with timestamp
                const timestamp = Date.now();
                const fileExtension = file.name.split('.').pop();
                const storageRef = storage.ref(`profile-pictures/${user.uid}_${timestamp}.${fileExtension}`);

                // Upload the file with metadata
                const metadata = {
                    contentType: file.type,
                    customMetadata: {
                        'userId': user.uid
                    }
                };

                // Upload file
                const snapshot = await storageRef.put(file, metadata);
                const photoURL = await snapshot.ref.getDownloadURL();

                // Update user profile with new photo URL
                await user.updateProfile({
                    photoURL: photoURL
                });

                // Update profile picture in UI
                const profilePicture = document.getElementById('profilePicture');
                const profileImg = document.querySelector('.profile-img');
                const dropdownProfileImg = document.querySelector('.dropdown-profile-img');
                const defaultImage = '../images/profile-placeholder.svg';

                const updateImage = (imgElement, src) => {
                    if (imgElement) {
                        imgElement.src = src;
                        imgElement.onerror = () => {
                            imgElement.src = defaultImage;
                        };
                    }
                };

                updateImage(profilePicture, photoURL || defaultImage);
                updateImage(profileImg, photoURL || defaultImage);
                updateImage(dropdownProfileImg, photoURL || defaultImage);

                // Update localStorage
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                userData.photoURL = photoURL;
                localStorage.setItem('userData', JSON.stringify(userData));

            } catch (error) {
                console.error('Error uploading profile picture:', error);
                showMessage(error.message || 'Error uploading profile picture. Please try again.', 'error');
            }
        });
    }

    // Cover picture upload
    if (changeCoverBtn && coverInput) {
        changeCoverBtn.addEventListener('click', () => {
            coverInput.click();
        });

        coverInput.addEventListener('change', async function (e) {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error('No user logged in');
                }

                // Show loading message
                showMessage('Uploading cover picture...', 'info');

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    throw new Error('Please select an image file');
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error('File size should be less than 5MB');
                }

                // Create a unique filename with timestamp
                const timestamp = Date.now();
                const fileExtension = file.name.split('.').pop();
                const storageRef = storage.ref(`cover-pictures/${user.uid}_${timestamp}.${fileExtension}`);

                // Upload the file with metadata
                const metadata = {
                    contentType: file.type,
                    customMetadata: {
                        'userId': user.uid
                    }
                };

                // Upload file
                const snapshot = await storageRef.put(file, metadata);
                const coverURL = await snapshot.ref.getDownloadURL();

                // Update cover picture in UI
                const coverPicture = document.getElementById('coverPicture');
                const defaultCover = '../images/profile-cover.svg';
                if (coverPicture) {
                    coverPicture.src = coverURL || defaultCover;
                    coverPicture.onerror = () => {
                        coverPicture.src = defaultCover;
                    };
                }

                // Update localStorage
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                userData.coverURL = coverURL;
                localStorage.setItem('userData', JSON.stringify(userData));

            } catch (error) {
                console.error('Error uploading cover picture:', error);
                showMessage(error.message || 'Error uploading cover picture. Please try again.', 'error');
            }
        });
    }

    // Change password button
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function () {
            const newPassword = prompt('Enter new password:');
            if (!newPassword) return;

            const user = auth.currentUser;
            if (!user) return;

            user.updatePassword(newPassword)
                .then(() => {
                    showMessage('Password updated successfully!', 'success');
                })
                .catch((error) => {
                    console.error('Error updating password:', error);
                    showMessage('Error updating password. Please try again.', 'error');
                });
        });
    }

    // Two-factor authentication button
    const twoFactorBtn = document.getElementById('twoFactorBtn');
    if (twoFactorBtn) {
        twoFactorBtn.addEventListener('click', function () {
            showMessage('Two-factor authentication is coming soon!', 'info');
        });
    }

    // Logout button
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            auth.signOut()
                .then(() => {
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                    showMessage('Error signing out. Please try again.', 'error');
                });
        });
    }

    // Helper function to update profile UI
    function updateProfileUI(user) {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        // Update profile name
        const profileName = document.getElementById('profileName');
        const userName = document.querySelector('.user-name');
        const userFullName = document.querySelector('.user-full-name');

        if (profileName) profileName.textContent = user.displayName || 'User';
        if (userName) userName.textContent = user.displayName || 'User';
        if (userFullName) userFullName.textContent = user.displayName || 'User';

        // Update profile email
        const profileEmail = document.getElementById('profileEmail');
        const userEmail = document.querySelector('.user-email');

        if (profileEmail) profileEmail.textContent = user.email;
        if (userEmail) userEmail.textContent = user.email;

        // Update profile picture
        const profilePicture = document.getElementById('profilePicture');
        const profileImg = document.querySelector('.profile-img');
        const dropdownProfileImg = document.querySelector('.dropdown-profile-img');
        const defaultImage = '../images/profile-placeholder.svg';

        const updateImage = (imgElement, src) => {
            if (imgElement) {
                imgElement.src = src;
                imgElement.onerror = () => {
                    imgElement.src = defaultImage;
                };
            }
        };

        const photoURL = user.photoURL || userData.photoURL;
        updateImage(profilePicture, photoURL || defaultImage);
        updateImage(profileImg, photoURL || defaultImage);
        updateImage(dropdownProfileImg, photoURL || defaultImage);

        // Update cover picture
        const coverPicture = document.getElementById('coverPicture');
        const defaultCover = '../images/profile-cover.svg';
        if (coverPicture) {
            const coverURL = userData.coverURL;
            coverPicture.src = coverURL || defaultCover;
            coverPicture.onerror = () => {
                coverPicture.src = defaultCover;
            };
        }
    }

    // Helper function to show messages
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}); 