// Display the logged-in user's name
function showGreeting() {
    let user = localStorage.getItem('loggedUser');
    if (user !== null) {
        document.getElementById('userName').innerText = user;
    }
}

// Display the current credit balance
function showCredit() {
    // Get the balance from local storage
    let balance = localStorage.getItem('userCredit');
    let creditSpan = document.getElementById('creditAmount');

    // Check if balance exists, show it. Otherwise, show 0.
    if (balance === null) {
        creditSpan.innerText = "0";
    } else {
        creditSpan.innerText = balance;
    }
}

// Used AI for the formatting and the Date functions (because we didn't learn it)
// And also https://www.w3schools.com/jsref/met_win_setinterval.asp

// Function to display current date and time
function showDateTime() {
    let now = new Date();

    // Formatting date and time
    let dateStr = now.toLocaleDateString('he-IL');
    let timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let timeStr = now.toLocaleTimeString('he-IL', timeOptions);

    document.getElementById('currentDate').innerText = dateStr;
    document.getElementById('currentTime').innerText = timeStr;
}

// Initialization function to run on page load
function init() {
    showGreeting();
    showDateTime();
    showCredit();

    // Automatically update the time every 1000 milliseconds
    setInterval(showDateTime, 1000);
}

// Start the dashboard logic
init();