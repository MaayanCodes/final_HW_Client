// Function to load orders from LocalStorage and build the table
function displayOrders() {
    // Get the data string from storage
    let data = localStorage.getItem('userOrders');
    let table = document.getElementById('myOrdersTable');
    let message = document.getElementById('emptyMsg');

    // Check if the data exists
    if (data === null) {
        // If no data, show the empty message
        message.style.display = "block";
    }
    else {
        // Convert the string back to a list of objects
        let ordersList = JSON.parse(data);

        // Sort: newest orders first using string comparison (YYYYMMDD)
        ordersList.sort(function(a, b) {
            // Convert DD.MM.YYYY to YYYYMMDD for reliable comparison
            // for example 10.1.2026 => 2026110
            let dateA = a.Date.split('/').reverse().join('');
            let dateB = b.Date.split('/').reverse().join('');

            // Return descending order (newest date becomes higher string value)
            if (dateB > dateA) return 1;
            if (dateB < dateA) return -1;
            return 0;
        });

        // Loop over the orders and create rows for each order
        for (let i = 0; i < ordersList.length; i++) {
            let currentOrder = ordersList[i];

            // Create row element
            let newRow = document.createElement('tr');

            // Set name cell
            let nameCell = document.createElement('td');
            nameCell.innerText = currentOrder.ProductName;

            // Set price cell
            let priceCell = document.createElement('td');
            priceCell.innerText = currentOrder.Price + " ₪";

            // Set date cell
            let dateCell = document.createElement('td');
            dateCell.innerText = currentOrder.Date;

            // Build the row
            newRow.appendChild(nameCell);
            newRow.appendChild(priceCell);
            newRow.appendChild(dateCell);

            // Add the row to the table
            table.appendChild(newRow);
        }
    }
}

// Initial function to start the logic
function init() {
    displayOrders();
}

// Start the page process
init();