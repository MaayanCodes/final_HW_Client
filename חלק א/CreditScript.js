// Updates UI elements with balance and nickname from LocalStorage
function showBalance() {
    // Get current credit and user nickname values from browser storage
    let moneyInStorage = localStorage.getItem('userCredit');
    let nickname = localStorage.getItem('userNickname');

    // Select graphical card display elements for dynamic updates
    let balanceDisplay = document.getElementById('displayBalance');
    let nameDisplay = document.getElementById('displayNickname');

    // Set balance display to stored value or default to zero
    if (moneyInStorage == null) {
        balanceDisplay.innerText = "0";
    } else {
        balanceDisplay.innerText = moneyInStorage;
    }

    // Display stored nickname or the default placeholder "אורח"
    if (nickname != null) {
        nameDisplay.innerText = nickname;
    } else {
        nameDisplay.innerText = "אורח";
    }
}

// Validates input and updates the stored credit balance
function addMoney() {
    // Get input field and extract user-entered value as a string
    let inputField = document.getElementById('amountInput');
    let textValue = inputField.value;

    // Convert the string input into a floating-point number
    let amountToAdd = parseFloat(textValue);

    // Proceed only if the amount is a valid positive number
    if (amountToAdd > 0) {
        // Fetch existing credit and calculate the updated total
        let currentCredit = localStorage.getItem('userCredit');
        let newTotal;

        // Initialize or increment balance based on existing data
        if (currentCredit == null) {
            newTotal = amountToAdd;
        }
        else {
            let existingNumber = parseFloat(currentCredit);
            newTotal = existingNumber + amountToAdd;
        }

        // Store the updated balance back to LocalStorage
        localStorage.setItem('userCredit', newTotal);

        // Refresh the graphical card UI immediately without page reload
        showBalance();

        // Clear input field and notify user of successful charge
        inputField.value = "";
        alert("הטעינה בוצעה בהצלחה! היתרה החדשה: " + newTotal + " ₪");

    } else {
        // Handle non-numeric or invalid input errors with an alert
        alert("יש להכניס מספר חיובי בלבד");
    }
}

// Page initialization logic to set up the card UI
function init() {
    // Populate the graphical card data on page load
    showBalance();
}

// Start the script execution
init();