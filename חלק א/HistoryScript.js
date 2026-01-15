// Retrieves order history from storage and dynamically populates the table
function displayOrders() {
    // Access the stored orders string from LocalStorage
    let data = localStorage.getItem('userOrders');
    let table = document.getElementById('myOrdersTable');
    let message = document.getElementById('emptyMsg');

    // Display a placeholder message if the history is empty or missing
    if (data == null || JSON.parse(data).length === 0) {
        message.style.display = "block";
    }
    else {
        // Convert the JSON string into a usable JavaScript array
        let ordersList = JSON.parse(data);

        // Apply the custom comparator function to sort orders by date
        ordersList.sort(sortOrdersByDate);

        // Iterate through each order object to build table rows
        for (let i = 0; i < ordersList.length; i++) {
            let currentOrder = ordersList[i];

            // Create the main row element for the table
            let newRow = document.createElement('tr');

            // Set up the product name data cell
            let nameCell = document.createElement('td');
            nameCell.innerText = currentOrder.ProductName;

            // Set up the price data cell with currency formatting
            let priceCell = document.createElement('td');
            priceCell.innerText = currentOrder.Price + " ₪";

            // Set up the date data cell
            let dateCell = document.createElement('td');
            dateCell.innerText = currentOrder.Date;

            // Assemble the cells into the row
            newRow.appendChild(nameCell);
            newRow.appendChild(priceCell);
            newRow.appendChild(dateCell);

            // Add the row to the table
            table.appendChild(newRow);
        }
    }
}

// Comparator function that sorts dates from newest to oldest
function sortOrdersByDate(a, b) {
    // Reformat dates to YYYYMMDD string for accurate chronological comparison
    // for example 10/1/2026 => 2026110
    let dateA = a.Date.split('/').reverse().join('');
    let dateB = b.Date.split('/').reverse().join('');

    // Return descending sort order logic (newest date becomes higher string value)
    if (dateB > dateA)
        return 1;
    if (dateB < dateA)
        return -1;
    // else A=B
    return 0;
}

// Main function to initialize the display logic on page load
function init() {
    displayOrders();
}

// Trigger the initialization sequence
init();