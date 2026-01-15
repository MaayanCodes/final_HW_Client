// Displays a visual status message to the user based on the operation result
function showStatus(msg, isError) {
    // Get the status element
    let status = document.getElementById('statusMsg');
    status.innerText = msg;

    // Apply conditional styling to distinguish between errors and success
    if (isError) {
        status.style.color = "red";
    }
    else {
        status.style.color = "green";
    }
    status.style.display = "block";
}

// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications

// Processes the menu JSON file and saves it to local storage
function loadMenuJSON() {
    // Capture the file object selected by the user from the input field
    let fileInput = document.getElementById('menuFileInput');
    // The content of the file is in fileInput.files[0]
    let file = fileInput.files[0];

    // Validate that a file has been selected before starting the reader
    if (!file) {
        showStatus("ראשית נא בחר קובץ", true);
        return;
    }

    // Initialize the FileReader to process the file content
    let reader = new FileReader();
    // Define the event handler for when the file reading process completes
    // (Action after reading finishes)
    reader.onload = function(e) {
        // Parse the raw text content into a JavaScript object
        let data = JSON.parse(e.target.result); // e.target.result - the content of the file
        // Overwrite the existing menu items in storage with the new data
        localStorage.setItem('menuItems', JSON.stringify(data));
        showStatus("התפריט נטען בהצלחה", false);
    };
    // Begin reading the file as a plain text string
    reader.readAsText(file);
}
// Merges imported order history with the current history in storage
function loadHistoryJSON() {
    // Identify the specific input element for history files
    let fileInput = document.getElementById('historyFileInput');
    let file = fileInput.files[0];

    // Ensure a file is present to avoid processing errors
    if (!file) {
        showStatus("ראשית נא בחר קובץ", true);
        return;
    }

    // Set up a new reader instance for the history data
    let reader = new FileReader();

    // Handle the logic once the history file is fully read
    reader.onload = function(e) {
        // Convert the imported JSON string into an array
        let newData = JSON.parse(e.target.result);
        // Fetch existing history or initialize an empty array if none exists
        let currentOrders = JSON.parse(localStorage.getItem('userOrders'));
        if (!currentOrders) {
            currentOrders = [];
        }

        // Iterate through the imported list and append each item to the main history
        for (let i = 0; i < newData.length; i++) {
            currentOrders.push(newData[i]);
        }

        // Persist the combined historical data back to LocalStorage
        localStorage.setItem('userOrders', JSON.stringify(currentOrders));
        showStatus("ההיסטוריה נטענה בהצלחה", false);
    };

    // Start the asynchronous reading of the history file
    reader.readAsText(file);
}