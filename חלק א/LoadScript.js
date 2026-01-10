// Function to show status message to the user
function showStatus(msg, isError) {
    // Get the status element
    let status = document.getElementById('statusMsg');
    status.innerText = msg;
    // Set color based on success or error
    if (isError) {
        status.style.color = "red";
    }
    else {
        status.style.color = "green";
    }
    status.style.display = "block";
}

// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications

// Function to handle menu file loading
function loadMenuJSON() {
    // Get the file input element
    let fileInput = document.getElementById('menuFileInput');
    let file = fileInput.files[0];

    // Check if file was selected
    if (!file) {
        showStatus("Please select a file first", true);
        return;
    }

    // Initialize file reader
    let reader = new FileReader();
    // Action after reading finishes
    reader.onload = function(e) {
        // Convert string content to JSON object
        let data = JSON.parse(e.target.result); // e.target.result - the content of the file
        // Store in LocalStorage
        localStorage.setItem('menuItems', JSON.stringify(data));
        showStatus("התפריט נטען בהצלחה", false);
    };
    reader.readAsText(file);
}

// Function to handle history file loading
function loadHistoryJSON() {
    // Get the history input element
    let fileInput = document.getElementById('historyFileInput');
    let file = fileInput.files[0];

    // Verify file selection
    if (!file) {
        showStatus("Please select a file first", true);
        return;
    }

    // Initialize reader for history file
    let reader = new FileReader();
    reader.onload = function(e) {
        let newData = JSON.parse(e.target.result);
        // Get existing history or start empty array
        let currentOrders = JSON.parse(localStorage.getItem('userOrders'));
        if (!currentOrders) {
            currentOrders = [];
        }

        // Loop through new orders and add to list
        for (let i = 0; i < newData.length; i++) {
            currentOrders.push(newData[i]);
        }

        // Save combined list to storage
        localStorage.setItem('userOrders', JSON.stringify(currentOrders));
        showStatus("History loaded successfully", false);
    };
    reader.readAsText(file);
}