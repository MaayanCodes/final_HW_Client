// Display the logged-in user's name
function showGreeting() {
    let user = localStorage.getItem('userNickname');
    if (user) {
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

/* JS FOR CHART.JS HISTOGRAM */
/*https://www.chartjs.org/docs/latest/charts/bar.html*/
/*https://www.chartjs.org/docs/latest/getting-started/*/

// Function to process order data and build the bar chart
function buildHistogram() {
    // Get the order history from LocalStorage
    let rawData = localStorage.getItem('userOrders');

    // Check if there is data. If not, we stop the function
    if (rawData === null) {
        return;
    }

// Convert the string from storage back to an array of objects
    let allOrders = JSON.parse(rawData);

    // Count how many times each item appears
    // We use an object to store "Item Name": "Count"
    let counts = {};

    for (let i = 0; i < allOrders.length; i++) {
        let productName = allOrders[i].ProductName;

        if (counts[productName] === undefined) {
            // First time we see this product
            counts[productName] = 1;
        }
        else {
            // We already have it, so add 1 to the count
            counts[productName] = counts[productName] + 1;
        }
    }

    // Transform the object into two arrays that Chart.js understands
    let labelsArray = []; // To store names
    let dataArray = [];   // To store amounts

    for (let key in counts) {
        labelsArray.push(key);
        dataArray.push(counts[key]);
    }

    // Define a list of colors for the bars
    let colorsPalette = [
        '#A67C7CCC',
        '#B8998CCC',
        '#D4B59DCC',
        '#EACFB4CC',
        '#C7B7C3CC',
        '#A8A4B8CC',
        '#93A3B8CC',
        '#7E92A8CC'
    ];

    // Initialize the Chart.js logic on our canvas
    let ctx = document.getElementById('purchaseChart').getContext('2d');

    let myChart = new Chart(ctx, {
        // Defines this as a bar chart (histogram)
        type: 'bar',
        data: {
            // Product names
            labels: labelsArray,
            datasets: [{
                label: 'מספר הזמנות',
                // Amounts
                data: dataArray,
                // Now we use the array of colors (on repeat)
                backgroundColor: colorsPalette,
                borderColor: '#ba782e',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    // Chart starts from 0
                    beginAtZero: true,
                    ticks: {
                        // Only show whole numbers (1,2,...)
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function init() {
    showGreeting();
    showDateTime();
    showCredit();
    buildHistogram();

    setInterval(showDateTime, 1000);
}

// Start the dashboard logic
init();