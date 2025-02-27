// script.js
document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    // Assuming you have an API endpoint that returns JSON data
    fetch('New_Testament.json')
    .then(response => response.json())
    .then(data => {
        displayData(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    
    // Clear existing data
    dataContainer.innerHTML = '';

    // Iterate over the data and create HTML elements to display it
    data.forEach(item => {
        const dataItem = document.createElement('div');
        dataItem.classList.add('data-item');
        dataItem.textContent = `BookID: ${item.bookId}, AuthorID: ${item.authorId}, Name: ${item.name}`;
        dataContainer.appendChild(dataItem);
    });
}