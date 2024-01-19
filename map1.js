// JavaScript code to dynamically create a dropdown with three options
// and display the selected location on an OpenStreetMap using Leaflet

document.addEventListener('DOMContentLoaded', function () {
  // Get the select element
  var selectLocation = document.getElementById("selectLocation");

  // Array of options with corresponding locations
  var locations = {
    "Option 1": [37.7749, -122.4194],  // San Francisco, CA
    "Option 2": [40.7128, -74.0060],   // New York, NY
    "Option 3": [34.0522, -118.2437]   // Los Angeles, CA
  };

  // Populate the dropdown with options
  for (var optionText in locations) {
    var option = document.createElement("option");
    option.text = optionText;
    option.value = optionText;
    selectLocation.add(option);
  }

  // Initialize the map
  var map = L.map('map').setView([37.7749, -122.4194], 12);

  // Add OpenStreetMap tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add an event listener to handle the selection change
  selectLocation.addEventListener('change', function () {
    var selectedOption = selectLocation.value;
    var selectedLocation = locations[selectedOption];

    // Clear existing markers on the map
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add a marker to the map at the selected location
    L.marker(selectedLocation).addTo(map)
      .bindPopup('Selected Location: ' + selectedOption)
      .openPopup();

    // Pan and zoom to the selected location
    map.setView(selectedLocation, 12);
  });
});
