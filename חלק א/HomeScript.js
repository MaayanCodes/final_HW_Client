// Function to show a greeting based on the current hour
function showGreeting() {
    // Get nickname from storage
    let user = localStorage.getItem('userNickname');
    // Get current hour (0-23)
    let hour = new Date().getHours();
    let greeting = "שלום";

    // Determine the correct greeting string
    if (hour >= 5 && hour < 12) {
        greeting = "בוקר טוב";
    } else if (hour >= 12 && hour < 18) {
        greeting = "צהריים טובים";
    } else if (hour >= 18 && hour < 23) {
        greeting = "ערב טוב";
    } else {
        greeting = "לילה טוב";
    }

    // Display the greeting with the nickname if it exists
    if (user) {
        document.getElementById('userName').innerText = greeting + ", " + user;
    }
}

// Function to count and display orders made in the current month
function showMonthlyOrders() {
    // Get the current date details
    let now = new Date();
    // getMonth() returns 0-11, so we add 1 to match the "MM" format (1-12)
    let currentMonth = now.getMonth() + 1;
    let currentYear = now.getFullYear();

    // Retrieve the orders string from Local Storage
    let data = localStorage.getItem('userOrders');
    let display = document.getElementById('monthlyOrdersCount');
    let count = 0;

    // Check if there is actually any data in storage
    if (data != null) {
        // Convert the JSON string back into a JavaScript array of objects
        let orders = JSON.parse(data);

        // Iterate through each order in the array
        for (let i = 0; i < orders.length; i++) {
            // Split the date string "DD.MM.YYYY" into an array using the dot as a separator
            // Example: "15.05.2024" becomes ["15", "05", "2024"]
            let dateParts = orders[i].Date.split('.');

            // Convert the string parts to integers for comparison
            let orderMonth = parseInt(dateParts[1]); // The second part is the month
            let orderYear = parseInt(dateParts[2]);  // The third part is the year

            // Compare the order's month and year with the current month and year
            if (orderMonth === currentMonth && orderYear === currentYear) {
                count++; // Increment the counter if it's a match
            }
        }
    }

    // Update the text on the screen with the final count
    display.innerText = "ביצעת " + count + " הזמנות החודש";
}

// Function to display the most recent order details from storage
function showLastOrder() {
    // Get order history string
    let data = localStorage.getItem('userOrders');
    let display = document.getElementById('lastOrderDetails');

    // If history exists, parse it and find the last item
    if (data !== null) {
        let orders = JSON.parse(data);

        // Only proceed if there is at least one order
        if (orders.length > 0) {
            // Access the last element in the array (newest order)
            let last = orders[orders.length - 1];

            // Format: Product Name | Price | Date
            display.innerText = last.ProductName + " | " + last.Date + " | " + last.Price + " ₪";
        }
    }
}

// Function to display the current credit balance
function showCredit() {
    // Fetch balance from local storage
    let balance = localStorage.getItem('userCredit');
    let creditSpan = document.getElementById('creditAmount');

    // Show 0 if no balance is found
    if (balance === null) {
        creditSpan.innerText = "0";
    } else {
        creditSpan.innerText = balance;
    }
}

// Function to display current date and time
function showDateTime() {
    // Get current date object
    let now = new Date();

    // Format date and time for Hebrew locale
    let dateStr = now.toLocaleDateString('he-IL');
    let timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let timeStr = now.toLocaleTimeString('he-IL', timeOptions);

    // Update the DOM elements
    document.getElementById('currentDate').innerText = dateStr;
    document.getElementById('currentTime').innerText = timeStr;
}

// Function to process order data and build the bar chart using Chart.js
function buildHistogram() {
    // Get the raw order data
    let rawData = localStorage.getItem('userOrders');

    // Stop if there is no data to display
    if (rawData === null) {
        return;
    }

    // Convert string to array of objects
    let allOrders = JSON.parse(rawData);
    // Object to store the frequency of each product
    let counts = {};

    // Count occurrences of each product name
    for (let i = 0; i < allOrders.length; i++) {
        let productName = allOrders[i].ProductName;

        if (counts[productName] === undefined) {
            counts[productName] = 1;
        } else {
            counts[productName] = counts[productName] + 1;
        }
    }

    // Prepare arrays for labels and data values
    let labelsArray = [];
    let dataArray = [];

    for (let key in counts) {
        labelsArray.push(key);
        dataArray.push(counts[key]);
    }

    // Colors for the bars
    let colorsPalette = [
        '#8FBC8F',
        '#558B5E',
        '#C0D9AF',
        '#9EA858',
        '#4E8A76',
        '#3A5F38',
        '#8CD1A8',
        '#6E8F58'
    ];

    // Get the canvas context for Chart.js
    let ctx = document.getElementById('purchaseChart').getContext('2d');

    // Create a new bar chart
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'מספר הזמנות',
                data: dataArray,
                backgroundColor: colorsPalette,
                borderColor: '#ba782e',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

// Main initialization function to run on page load
function init() {
    showGreeting();
    showDateTime();
    showCredit();
    showLastOrder();
    buildHistogram();
    showMonthlyOrders();

    // Update the clock every 1 second
    setInterval(showDateTime, 1000);
}

// Start the script
init();