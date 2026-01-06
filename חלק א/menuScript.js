// Database of items
const menuItems = [
    { id: 1, name: "קפוצ'ינו", price: 15, category: "משקאות", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300", desc: "קפה איטלקי קלאסי עם חלב מוקצף" },
    { id: 2, name: "אייס לאטה", price: 18, category: "משקאות", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300", desc: "קפה קר מרענן על בסיס חלב" },
    { id: 3, name: "תה נענע", price: 12, category: "משקאות", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300", desc: "תה חם עם עלי נענע טריים" },
    { id: 4, name: "קרואסון חמאה", price: 14, category: "מאפים", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300", desc: "בצק עלים פריזאי קלאסי" },
    { id: 5, name: "דניש גבינה", price: 16, category: "מאפים", img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=300", desc: "מאפה שמרים במילוי גבינה עשירה" },
    { id: 6, name: "מאפין שוקולד", price: 12, category: "מאפים", img: "https://images.unsplash.com/photo-1587538639018-bdc15181745e?w=300", desc: "מאפין נימוח עם פצפוצי שוקולד" },
    { id: 7, name: "סלט יווני", price: 42, category: "סלטים", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300", desc: "ירקות גינה, פטה וזיתי קלמטה" },
    { id: 8, name: "סלט חלומי", price: 48, category: "סלטים", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300", desc: "קוביות חלומי מטוגנות על מצע ירקות" },
    { id: 9, name: "כריך טוניסאי", price: 35, category: "כריכים", img: "https://images.unsplash.com/photo-1521390188846-e2a3f9c7f50e?w=300", desc: "טונה, תפוח אדמה, ביצה קשה ואריסה" },
    { id: 10, name: "כריך מוצרלה", price: 32, category: "כריכים", img: "https://images.unsplash.com/photo-1539252554454-31d626bd57b8?w=300", desc: "מוצרלה טרייה, עגבנייה ופסטו" },
    { id: 11, name: "טוסט גבינות", price: 28, category: "טוסטים", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300", desc: "גבינה צהובה, בולגרית ורטבים" },
    { id: 12, name: "טוסט פיצה", price: 30, category: "טוסטים", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300", desc: "גבינה צהובה, רוטב פיצה וזיתים" },
    { id: 13, name: "בוקר יחיד", price: 65, category: "ארוחות בוקר", img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300", desc: "ביצים לבחירה, מטבלים, לחם ושתייה" },
    { id: 14, name: "שקשוקה ביתית", price: 55, category: "ארוחות בוקר", img: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?w=300", desc: "שתי ביצים ברוטב עגבניות פיקנטי" }
];

// Render items based on the chosen category
function renderMenu(category) {
    let container = document.getElementById('itemsContainer');
    container.innerHTML = "";

    for (let i = 0; i < menuItems.length; i++) {
        let item = menuItems[i];

        if (item.category === category) {
            // Create Card Container
            let card = document.createElement('div');
            card.setAttribute('class', 'item-card');

            // Create Image
            let img = document.createElement('img');
            img.src = item.img;
            img.alt = item.name;

            // Create Title
            let h3 = document.createElement('h3');
            h3.innerText = item.name;

            // Create Description
            let p = document.createElement('p');
            p.innerText = item.desc;

            // Create Price Tag
            let priceTag = document.createElement('div');
            priceTag.className = 'price-tag';
            priceTag.innerText = item.price + ' ₪';

            // Create Purchase Button
            let buyBtn = document.createElement('button');
            buyBtn.className = 'add-btn';
            buyBtn.innerText = 'רכישה';

            // On click, start the purchase process for this specific item
            buyBtn.onclick = function() {
                processPurchase(item);
            };

            // Build the card
            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(p);
            card.appendChild(priceTag);
            card.appendChild(buyBtn);

            // Add the card
            container.appendChild(card);
        }
    }
}

// Function to handle the purchase logic
function processPurchase(item) {

    // Get the current credit from storage
    let creditValue = localStorage.getItem('userCredit');
    let currentBalance = 0;

    if (creditValue !== null) {
        currentBalance = parseFloat(creditValue);
    }

    // Check if user has enough money
    if (currentBalance >= item.price) {

        // Update Balance
        let newBalance = currentBalance - item.price;
        localStorage.setItem('userCredit', newBalance);

        // Register the Order in History
        let ordersFromStorage = localStorage.getItem('userOrders');
        let ordersArray = [];

        // If history exists, parse it. Otherwise, use empty array.
        if (ordersFromStorage != null) {
            // Convert from JSON
            ordersArray = JSON.parse(ordersFromStorage);
        }

        // Create the order data object
        let newOrder = {
            name: item.name,
            price: item.price,
            date: new Date().toLocaleDateString('he-IL')
        };

        // Add to history and save back as JSON
        ordersArray.push(newOrder);
        localStorage.setItem('userOrders', JSON.stringify(ordersArray));

        // Notify User and Refresh
        alert("הקנייה בוצעה בהצלחה! קניית:  " + item.name);

    }
    else {
        // If balance is too low
        alert("הפעולה נכשלה: אין מספיק כסף בחשבון");
    }
}

// Initialization function
function init() {
    let chosenCategory = localStorage.getItem('selectedCategory');

    // Check if category exists before rendering
    if (chosenCategory != null) {
        document.getElementById('menuTitle').innerText = "תפריט " + chosenCategory;
        renderMenu(chosenCategory);
    }
}

init();