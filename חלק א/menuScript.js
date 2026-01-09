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
function renderMenu(categoryName) {
    // Get the container element using DOM
    let container = document.getElementById('itemsContainer');
    container.innerHTML = "";

    // Load items from local storage
    let menuData = localStorage.getItem('menuItems');
    let menuItems = [];

    // If data exists, parse the JSON string
    if (menuData != null) {
        menuItems = JSON.parse(menuData);
    }

    // Get the ID for the current category string
    let categoryId = getCategoryId(categoryName);

    // Loop through all items loaded from storage
    for (let i = 0; i < menuItems.length; i++) {
        let item = menuItems[i];

        // Filter items by category ID
        if (item.Categoryld === categoryId) {
            // Create item card
            let card = document.createElement('div');
            card.setAttribute('class', 'item-card');

            // Set up the product image
            let img = document.createElement('img');
            img.src = item.img;


            // Set up title
            let h3 = document.createElement('h3');
            h3.innerText = item.ProductName;

            // Set up description
            let p = document.createElement('p');
            p.innerText = item.desc;

            // Set up price
            let priceTag = document.createElement('div');
            priceTag.innerText = item.Price + ' ₪';

            // Create buy button
            let buyBtn = document.createElement('button');
            buyBtn.className = 'add-btn';
            buyBtn.innerText = 'רכישה';

            // Add click event for purchase logic
            buyBtn.onclick = function() {
                processPurchase(item);
            };

            // Assemble the card and append to container
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
    // Check current balance in storage
    let creditValue = localStorage.getItem('userCredit');
    let currentBalance = 0;

    if (creditValue !== null) {
        currentBalance = parseFloat(creditValue);
    }

    // Compare balance with item price (convert string price to number)
    let itemPrice = parseFloat(item.Price);

    if (currentBalance >= itemPrice) {
        // Deduct price and update storage
        let newBalance = currentBalance - itemPrice;
        localStorage.setItem('userCredit', newBalance);

        // Update order history
        let ordersFromStorage = localStorage.getItem('userOrders');
        let ordersArray = [];

        if (ordersFromStorage !== null) {
            ordersArray = JSON.parse(ordersFromStorage);
        }

        // Create new order record
        let newOrder = {
            ProductName: item.ProductName,
            Price: item.Price,
            Date: new Date().toLocaleDateString('he-IL')
        };

        // Save order back to storage
        ordersArray.push(newOrder);
        localStorage.setItem('userOrders', JSON.stringify(ordersArray));

        // Show success message to user
        alert("הקנייה בוצעה בהצלחה! רכשת: " + item.ProductName);
    } else {
        // Show error message for low balance
        alert("הפעולה נכשלה: אין מספיק כסף בחשבון");
    }
}

// Main initialization function
function init() {
    // Get the category that was clicked in the previous screen
    let chosenCategory = localStorage.getItem('selectedCategory');

    if (chosenCategory !== null) {
        document.getElementById('menuTitle').innerText = "תפריט " + chosenCategory;
        renderMenu(chosenCategory);
    }
}

// Start the page logic
init();