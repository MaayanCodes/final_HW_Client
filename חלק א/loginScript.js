// Database of users
const usersDatabase = [
    { user: "מעיין", pass: "1234" },
    { user: "לקוח", pass: "456" },
    { user: "מנהל", pass: "999" }
];

function login() {
    // Get input values and error message element
    const username = document.getElementById('userNameInput').value;
    const password = document.getElementById('userPassInput').value;
    const errorMsg = document.getElementById('errorMsg');

    // Check that the fields are not empty
    if (username.trim() === "" || password.trim() === "") {
        errorMsg.innerText = "נא להזין שם משתמש וסיסמה!";
        errorMsg.style.display = "block";
        return;
    }

    let isUserValid = false;

    // Check if the user is in the DB
    for (let i = 0; i < usersDatabase.length; i++) {
        if (usersDatabase[i].user === username && usersDatabase[i].pass === password) {
            isUserValid = true;
            break;
        }
    }

    // Move to menu page if valid, otherwise show error
    if (isUserValid) {
        // Save username for later
        localStorage.setItem('loggedUser', username);
        window.location.href = 'Home.html'; // Not in slides, found on web
    } else {
        errorMsg.innerText = "שם משתמש או סיסמה לא נכונים!";
        errorMsg.style.display = "block";
    }
}