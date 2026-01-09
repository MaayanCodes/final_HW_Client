// Set initial authorized user in LocalStorage
localStorage.setItem('user', 'manti@cafe.com');
localStorage.setItem('password', '12345678');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

function login() {
    // Get values from input fields
    const email = document.getElementById('userEmailInput').value;
    const password = document.getElementById('userPassInput').value;
    const nickname = document.getElementById('userNickInput').value;
    const errorMsg = document.getElementById('errorMsg');

    // RegEx for email validation
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Check email format
    if (!emailRegEx.test(email)) {
        errorMsg.innerText = "נא להזין אימייל תקין";
        errorMsg.style.display = "block";
        return;
    }

    // Check password length
    if (password.length < 8) {
        errorMsg.innerText = "הסיסמה חייבת להיות לפחות 8 תווים";
        errorMsg.style.display = "block";
        return;
    }

    // Check if nickname is empty
    if (nickname.trim() === "") {
        errorMsg.innerText = "נא להזין כינוי";
        errorMsg.style.display = "block";
        return;
    }

    // Get saved credentials for comparison
    const savedUser = localStorage.getItem('user');
    const savedPass = localStorage.getItem('password');

    // Verify user credentials
    if (email === savedUser && password === savedPass) {
        // Clear previous storage data
        localStorage.clear();

        // Save info back for future logins
        localStorage.setItem('user', savedUser);
        localStorage.setItem('password', savedPass);

        // Save nickname of current session for home page
        localStorage.setItem('userNickname', nickname);

        // Redirect to Home page
        window.location.href = 'Home.html';
    }
    else {
        // Show error for wrong credentials
        errorMsg.innerText = "אימייל או סיסמה לא נכונים";
        errorMsg.style.display = "block";
    }
}