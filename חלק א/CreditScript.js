// Display the current balance on the screen
function showBalance() {
    // Get the value from local storage
    let moneyInStorage = localStorage.getItem('userCredit');
    let displayDiv = document.getElementById('balanceDisplay');

    // Check if the key exists in storage
    if (moneyInStorage === null) {
        // If it doesn't exist, show zero
        displayDiv.innerText = "0 ₪";
    } else {
        // If it exists, show the stored value
        displayDiv.innerText = moneyInStorage + " ₪";
    }
}

// Function to handle the money loading process
function addMoney() {
    // Get the input element and its text value
    let inputField = document.getElementById('amountInput');
    let textValue = inputField.value;

    // Convert the text to a float parseFloat
    let amountToAdd = parseFloat(textValue);

    // Check if the amount is a valid positive number
    if (amountToAdd > 0) {

        // Get the current credit from storage
        let currentCredit = localStorage.getItem('userCredit');
        let newTotal;

        if (currentCredit === null) {
            // If it's the first time, the new total is just the input amount
            newTotal = amountToAdd;
        } else {
            // Convert existing storage string to a number and add the new amount
            let existingNumber = parseFloat(currentCredit);
            newTotal = existingNumber + amountToAdd;
        }

        // 5. Save the updated total back to local storage
        localStorage.setItem('userCredit', newTotal);

        // 6. Update the screen and notify the user
        showBalance();
        // Clear the input box
        inputField.value = "";
        alert("הטעינה בוצעה בהצלחה! הטענת: " + amountToAdd + " ₪");

    } else {
        // If the input was invalid or zero/negative
        alert("יש להכניס מספר חיובי בלבד");
    }
}

// Initialization function to run when the page loads
function init() {
    showBalance();
}

// Start the script
init();