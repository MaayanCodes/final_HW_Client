// Function to show a greeting based on the current time
function showGreeting() {
    // Retrieves the stored nickname to personalize the header
    let user = localStorage.getItem('userNickname');

    // Captures the current hour in 24-hour format (0-23)
    let hour = new Date().getHours();
    let greeting = "שלום";

    // Logic to select the appropriate greeting string based on the time of day
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

// Calculates and displays the total number of orders placed in the current calendar month
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
        // Filters orders by comparing their saved date components to the current date
        for (let i = 0; i < orders.length; i++) {
            // Split the date string "DD/MM/YYYY" into an array using the / as a separator
            // Example: "15/05/2024" becomes ["15", "05", "2024"]
            let dateParts = orders[i].Date.split('/');

            // Convert the string parts to integers for comparison and get the month and year
            let orderMonth = parseInt(dateParts[1]); // The second part is the month
            let orderYear = parseInt(dateParts[2]);  // The third part is the year

            // Compare the order's month and year with the current month and year
            if (orderMonth === currentMonth && orderYear === currentYear) {
                count++; // Increment the counter if it's a match
            }
        }
    }

    // Updates the dashboard UI with the calculated sum
    display.innerText = "ביצעת " + count + " הזמנות החודש";
}

// Retrieves and displays the details of the very last order found in the history array
function showLastOrder() {
    // Get order history string
    let data = localStorage.getItem('userOrders');
    let display = document.getElementById('lastOrderDetails');

    // If history exists, parse it and find the last item
    if (data) {
        let orders = JSON.parse(data);

        // Ensures the array is not empty before attempting to access an index
        if (orders.length > 0) {
            // Use the helper function from historyScript.js to sort the items
            orders.sort(sortOrdersByDate);
            // Selects the first element in the array representing the most recent purchase
            let latest = orders[0];

            // Injects a formatted string: Product Name | Price | Date
            display.innerText = latest.ProductName + " | " + latest.Date + " | " + latest.Price + " ₪";
        }
    }
}

// Updates the credit balance display from LocalStorage
function showCredit() {
    // Fetch balance from local storage
    let balance = localStorage.getItem('userCredit');
    let creditSpan = document.getElementById('creditAmount');

    // Defaults to zero if the user has no recorded credit balance
    if (balance === null) {
        creditSpan.innerText = "0";
    } else {
        creditSpan.innerText = balance;
    }
}

// Renders the current date and time using localized Hebrew formatting
function showDateTime() {
    // Get current date object
    let now = new Date();

    // Standard Hebrew locale date string (DD.MM.YYYY)
    let dateStr = now.toLocaleDateString('he-IL');

    // Configures the time format to include hours, minutes, and seconds
    let timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let timeStr = now.toLocaleTimeString('he-IL', timeOptions);

    // Synchronizes the display elements with the latest time data
    document.getElementById('currentDate').innerText = dateStr;
    document.getElementById('currentTime').innerText = timeStr;
}

// Aggregates order data and initializes a Bar Chart using the Chart.js library
function buildHistogram() {
    // Get the raw order data
    let rawData = localStorage.getItem('userOrders');

    // Exits early if no data is available to prevent chart errors
    if (rawData === null) {
        return;
    }

    // Convert string to array of objects
    let allOrders = JSON.parse(rawData);
    // An object used as a hash map to store 'Product Name': 'Total Count'
    let counts = {};

    // Populates the frequency map by iterating through the order history
    for (let i = 0; i < allOrders.length; i++) {
        let productName = allOrders[i].ProductName;

        if (counts[productName] === undefined) {
            counts[productName] = 1;
        } else {
            counts[productName] = counts[productName] + 1;
        }
    }

    // Separates the frequency map into arrays compatible with Chart.js labels and data
    let labelsArray = [];
    let dataArray = [];

    for (let key in counts) {
        labelsArray.push(key);
        dataArray.push(counts[key]);
    }

    // Colors for the bars
    let colorsPalette = [
        '#FFADAD',
        '#FFD6A5',
        '#FDFFB6',
        '#CAFFBF',
        '#9BF6FF',
        '#A0C4FF',
        '#BDB2FF',
        '#FFC6FF'
    ];

    // Get the canvas context for Chart.js
    // Targets the HTML Canvas element for chart rendering
    let ctx = document.getElementById('purchaseChart').getContext('2d');

    // Constructor for the Chart.js instance
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
                    // Ensures the Y-axis only displays whole number increments
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}


// Entry point for the dashboard logic; executes all display functions on load
function init() {
    showGreeting();
    showDateTime();
    showCredit();
    showLastOrder();
    buildHistogram();
    showMonthlyOrders();

    // Establishes a 1-second interval to create a live-updating digital clock
    setInterval(showDateTime, 1000);
}

// Triggers the initialization sequence
init();