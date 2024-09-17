// Function to fetch GDC data using the API
async function fetchGDCData() {
    // GDC API endpoint for retrieving projects data
    const url = 'https://api.gdc.cancer.gov/projects';

    // Set up query parameters (you can modify these to filter for specific data)
    const params = {
        size: 100, // Return only 10 projects for this example
    };

    try {
        // Make the API request
        const response = await fetch(url + '?' + new URLSearchParams(params));

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Failed to fetch data from GDC API');
        }

        // Parse the JSON response
        const data = await response.json();

        // Log or process the data
        console.log(data);
        displayData(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to display fetched data on the web page
function displayData(data) {
    const body = document.querySelector('body');
    const title = document.createElement('h1');
    title.innerText = 'GDC Projects';
    body.appendChild(title);

    const list = document.createElement('ul');
    data.data.hits.forEach(project => {
        const item = document.createElement('li');
        item.innerText = project.project_id + ': ' + project.name;
        list.appendChild(item);
    });

    body.appendChild(list);
}

// Call the function to fetch and display the data when the page loads
window.onload = fetchGDCData;
