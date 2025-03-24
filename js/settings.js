document.addEventListener('DOMContentLoaded', function () {
    // Get Firebase auth instance
    const auth = firebase.auth();

    // Check if user is logged in
    auth.onAuthStateChanged(function (user) {
        if (!user) {
            // User is signed out, redirect to login
            window.location.href = 'login.html';
            return;
        }

        // Load user settings
        loadUserSettings(user);
    });

    // Save settings button
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function () {
            saveUserSettings();
        });
    }

    // Cancel button
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            window.location.href = 'dashboard.html';
        });
    }

    // Delete account button
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                deleteUserAccount();
            }
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

    // Theme toggle button
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            toggleTheme();
        });
    }

    // Helper function to load user settings
    function loadUserSettings(user) {
        // Load settings from localStorage or Firebase
        const settings = JSON.parse(localStorage.getItem('userSettings')) || {
            language: 'en',
            timezone: 'UTC',
            dateFormat: 'MM/DD/YYYY',
            notifications: {
                email: true,
                weather: true,
                market: true,
                newsletter: true
            },
            privacy: {
                profileVisibility: true,
                showLocation: true,
                showContact: true
            }
        };

        // Update form values
        const languageSelect = document.getElementById('language');
        const timezoneSelect = document.getElementById('timezone');
        const dateFormatSelect = document.getElementById('dateFormat');

        if (languageSelect) languageSelect.value = settings.language;
        if (timezoneSelect) timezoneSelect.value = settings.timezone;
        if (dateFormatSelect) dateFormatSelect.value = settings.dateFormat;

        // Update notification settings
        const emailNotifications = document.querySelector('input[name="emailNotifications"]');
        const weatherAlerts = document.querySelector('input[name="weatherAlerts"]');
        const marketUpdates = document.querySelector('input[name="marketUpdates"]');
        const newsletter = document.querySelector('input[name="newsletter"]');

        if (emailNotifications) emailNotifications.checked = settings.notifications.email;
        if (weatherAlerts) weatherAlerts.checked = settings.notifications.weather;
        if (marketUpdates) marketUpdates.checked = settings.notifications.market;
        if (newsletter) newsletter.checked = settings.notifications.newsletter;

        // Update privacy settings
        const profileVisibility = document.querySelector('input[name="profileVisibility"]');
        const showLocation = document.querySelector('input[name="showLocation"]');
        const showContact = document.querySelector('input[name="showContact"]');

        if (profileVisibility) profileVisibility.checked = settings.privacy.profileVisibility;
        if (showLocation) showLocation.checked = settings.privacy.showLocation;
        if (showContact) showContact.checked = settings.privacy.showContact;
    }

    // Helper function to save user settings
    function saveUserSettings() {
        const settings = {
            language: document.getElementById('language').value,
            timezone: document.getElementById('timezone').value,
            dateFormat: document.getElementById('dateFormat').value,
            notifications: {
                email: document.querySelector('input[name="emailNotifications"]').checked,
                weather: document.querySelector('input[name="weatherAlerts"]').checked,
                market: document.querySelector('input[name="marketUpdates"]').checked,
                newsletter: document.querySelector('input[name="newsletter"]').checked
            },
            privacy: {
                profileVisibility: document.querySelector('input[name="profileVisibility"]').checked,
                showLocation: document.querySelector('input[name="showLocation"]').checked,
                showContact: document.querySelector('input[name="showContact"]').checked
            }
        };

        // Save to localStorage
        localStorage.setItem('userSettings', JSON.stringify(settings));

        // Show success message
        showMessage('Settings saved successfully!', 'success');
    }

    // Helper function to delete user account
    function deleteUserAccount() {
        const user = auth.currentUser;
        if (!user) return;

        // Delete user data from localStorage
        localStorage.removeItem('userSettings');
        localStorage.removeItem('user');

        // Delete user account
        user.delete()
            .then(() => {
                window.location.href = 'login.html';
            })
            .catch((error) => {
                console.error('Error deleting account:', error);
                showMessage('Error deleting account. Please try again.', 'error');
            });
    }

    // Helper function to toggle theme
    function toggleTheme() {
        const body = document.body;
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        showMessage(`Theme changed to ${isDarkMode ? 'dark' : 'light'} mode!`, 'success');
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