// Pre-define the authorized administrator credentials in LocalStorage for system access
localStorage.setItem('user', 'manti@bestTeamSoFar.com');
localStorage.setItem('password', '11223344');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions


/**
 * Main authentication function
 * Validates user input, checks against stored credentials, and manages the session
 */
function login() {
    // Capture user input from the DOM elements
    const email = document.getElementById('userEmailInput').value;
    const password = document.getElementById('userPassInput').value;
    const nickname = document.getElementById('userNickInput').value;
    const errorMsg = document.getElementById('errorMsg');

    // Standard Regular Expression pattern for validating email format
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Validate that the email matches a proper structure (e.g., name@domain.com)
    if (!emailRegEx.test(email)) {
        errorMsg.innerText = "נא להזין אימייל תקין";
        errorMsg.style.display = "block";
        return;
    }

    // Ensure the password meets the minimum security length of 8 characters
    if (password.length < 8) {
        errorMsg.innerText = "הסיסמה חייבת להיות לפחות 8 תווים";
        errorMsg.style.display = "block";
        return;
    }

    // Check if the nickname field is empty or contains only whitespace
    if (nickname.trim() === "") {
        errorMsg.innerText = "נא להזין כינוי";
        errorMsg.style.display = "block";
        return;
    }

    // Retrieve the authorized credentials from storage for verification
    const savedUser = localStorage.getItem('user');
    const savedPass = localStorage.getItem('password');

    // Perform the final credential check
    if (email === savedUser && password === savedPass) {
        // Clear all existing data in LocalStorage to ensure a fresh session
        localStorage.clear();

        // Restore the primary credentials so the user can log in again later
        localStorage.setItem('user', savedUser);
        localStorage.setItem('password', savedPass);

        // Store the user's chosen nickname to personalize the dashboard
        localStorage.setItem('userNickname', nickname);

        // Navigate the user to the main application dashboard
        window.location.href = 'Home.html';
    }
    else {
        // Provide feedback if either the email or password does not match
        errorMsg.innerText = "אימייל או סיסמה לא נכונים";
        errorMsg.style.display = "block";
    }
}