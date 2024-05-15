// Function to switch between pages
function goToPage(pageId) {
    // Hide all pages
    const pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
      pages[i].style.display = 'none';
    }
    // Show the selected page
    document.getElementById(pageId).style.display = 'block';
}

// Function to clear input fields
function clearInput(inputId) {
document.getElementById(inputId).value = '';
}

// Placeholder functions for Reality Check and Conversion logic
function realityCheck() {
// Add your reality check logic here
// For now it just displays the input
const input = document.getElementById('reality-input').value;
document.getElementById('reality-output').textContent = input;
}

function conversionFunction() {
// Add your conversion logic here
// For now it just displays the input and selected unit
const input = document.getElementById('conversion-input').value;
const unit = document.getElementById('conversion-unit').value;
document.getElementById('conversion-output').textContent = `${input} ${unit}`;
}