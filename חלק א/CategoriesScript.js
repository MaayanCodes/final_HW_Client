// Processes the user's category selection and manages page transition
function selectCategory(categoryName) {
    // Stores the selected category in LocalStorage to inform the Menu page which items to load
    localStorage.setItem('selectedCategory', categoryName);

    // Redirects the user to the menu items screen
    window.location.href = 'menu.html';
}