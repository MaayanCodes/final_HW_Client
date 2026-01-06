// Function to handle category selection and storage
function selectCategory(categoryName) {
    // Save the selected category to localStorage
    localStorage.setItem('selectedCategory', categoryName);

    // Navigate to the items menu
    window.location.href = 'menu.html';
}