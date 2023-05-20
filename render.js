// Create the gauge instance

steelseries = require('steelseries')
const gauge = new steelseries.Radial('gauge', {
  minValue: 0,
  maxValue: 100,
});

// Function to update the gauge value
function updateGauge(value) {
  gauge.setValue(value);
}

// Function to make the GET request and update the gauge value
async function fetchDataAndUpdateGauge() {
  try {
    const response = await axios.get('https://example.com/api/value'); // Replace with your server's API endpoint
    const value = response.data.value; // Assuming the response has a JSON structure with a "value" field
    updateGauge(value);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// Call the fetch function periodically (e.g., every 5 seconds)
setInterval(fetchDataAndUpdateGauge, 5000);