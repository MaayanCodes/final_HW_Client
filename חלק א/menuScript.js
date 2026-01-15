// Helper function to map category names to IDs from the JSON
function getCategoryId(categoryName) {
    if (categoryName === "משקאות") return 1;
    if (categoryName === "מאפים") return 2;
    if (categoryName === "סלטים") return 3;
    if (categoryName === "כריכים") return 4;
    if (categoryName === "טוסטים") return 5;
    if (categoryName === "ארוחות בוקר") return 6;
    return 0;
}

// Function to render items based on the chosen category
// Dynamically generates HTML elements for products belonging to the selected category
function renderMenu(categoryName) {
    // Selects the target container and clears any existing content (to add via DOM)
    let container = document.getElementById('itemsContainer');
    container.innerHTML = "";

    // Retrieves the menu data from local storage
    let menuData = localStorage.getItem('menuItems');
    let menuItems = [];

    // Parses the data into an array if it exists
    if (menuData != null) {
        menuItems = JSON.parse(menuData);
    }

    // Identifies the ID to filter products correctly
    let categoryId = getCategoryId(categoryName);

    // Iterates through the full menu to find matching items of the category
    for (let i = 0; i < menuItems.length; i++) {
        let item = menuItems[i];

        // Only creates elements for items within the current category
        if (item.CategoryId === categoryId) {
            // Main card wrapper for the product
            let card = document.createElement('div');
            card.setAttribute('class', 'item-card');

            // Product image setup
            let img = document.createElement('img');
            img.src = item.img;


            // Product title (H3)
            let h3 = document.createElement('h3');
            h3.innerText = item.ProductName;

            // Product description
            let p = document.createElement('p');
            p.innerText = item.desc;

            // Price display formatted with currency symbol
            let priceTag = document.createElement('div');
            priceTag.innerText = item.Price + ' ₪';

            // Interaction button for the purchase
            let buyBtn = document.createElement('button');
            buyBtn.className = 'add-btn';
            buyBtn.innerText = 'רכישה';

            // Add click event for purchase logic
            buyBtn.onclick = function() {
                processPurchase(item);
            };

            // Appends all components to the card and append to the container
            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(p);
            card.appendChild(priceTag);
            card.appendChild(buyBtn);
            container.appendChild(card);
        }
    }
}

// Handle the purchase process and credit updates
function processPurchase(item) {
    // Retrieves and converts current credit from a string to a floating-point number
    let creditValue = localStorage.getItem('userCredit');
    let currentBalance = 0;
    if (creditValue !== null) {
        currentBalance = parseFloat(creditValue);
    }

    let itemPrice = parseFloat(item.Price);

    // Checks if the user has sufficient funds
    if (currentBalance >= itemPrice) {
        // Updates the remaining balance in storage
        let newBalance = currentBalance - itemPrice;
        localStorage.setItem('userCredit', newBalance);

        // Fetches existing order history or initializes a new array
        let ordersFromStorage = localStorage.getItem('userOrders');
        let ordersArray = [];

        // If history exists, convert it from JSON string to an array
        if (ordersFromStorage !== null) {
            ordersArray = JSON.parse(ordersFromStorage);
        }

        // Logic for formatting the current date as DD/MM/YYYY with leading zeros
        let now = new Date();
        let d = now.getDate();
        // getMonth is zero-based (0-11) so we add one to get 1-12
        let m = now.getMonth() + 1;
        let y = now.getFullYear();

        // Standardizes day and month digits for consistent sorting later (adding leading zero)
        if (d < 10) {
            d = "0" + d;
        }
        if (m < 10) {
            m = "0" + m;
        }

        // Create formatted date string: DD/MM/YYYY
        let formattedDate = d + "/" + m + "/" + y;

        // Creates a structured record of the transaction
        let newOrder = {
            ProductName: item.ProductName,
            Price: item.Price,
            Date: formattedDate
        };

        // Appends the new order to the list and saves the updated history string
        ordersArray.push(newOrder);
        localStorage.setItem('userOrders', JSON.stringify(ordersArray));

        // Provides immediate visual confirmation of the successful transaction
        alert("הקנייה בוצעה בהצלחה! רכשת: " + item.ProductName + ' נשארה יתרה של: ' + newBalance);
    }
    else {
        // Fallback error if funds are inadequate
        alert("הפעולה נכשלה: אין מספיק כסף בחשבון");
    }
}

// Main initialization function
function init() {

    // Retrieves the state passed from the Categories page
    let chosenCategory = localStorage.getItem('selectedCategory');

    // Updates the page header and populates the items if a category is found
    if (chosenCategory !== null) {
        document.getElementById('menuTitle').innerText = "תפריט " + chosenCategory;
        renderMenu(chosenCategory);
    }
}

// Launches the script logic upon page load
init();