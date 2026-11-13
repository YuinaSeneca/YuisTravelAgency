// Hero carousel (Glide.js)
const glide = new Glide(".glide", {
    type: "carousel",   // loops back to the first slide after the last one
    perView: 1,         // show one slide at a time
    autoplay: 5000,     // move to the next slide every 5 seconds
    hoverpause: true,   // pause autoplay while the mouse is over the slider
    animationDuration: 800
});

glide.mount();

// aos - animate on scroll
AOS.init({
    duration: 800,   // animation length in milliseconds
    once: true,      // only animate the first time you scroll past
    offset: 80       // start the animation 80px before the element is in view
});


// leaflet (interactive map) 
const stops = [
    { name: "Tokyo", coords: [35.6595, 139.7005], text: "Days 1 &ndash; 2: Shibuya, Asakusa and Harajuku." },
    { name: "Mount Fuji", coords: [35.5013, 138.8015], text: "Day 3: Chureito pagoda and Lake Kawaguchiko." },
    { name: "Kyoto", coords: [35.0116, 135.7681], text: "Days 4 &ndash; 5: Fushimi Inari, the Golden Pavilion and Arashiyama." },
    { name: "Nara", coords: [34.6851, 135.8048], text: "Day 6: the deer park and Todai-ji temple." },
    { name: "Osaka", coords: [34.6687, 135.5013], text: "Day 7: street food in Dotonbori." }
];

// create the map inside <div id="trip-map"> and centre it on japan
const map = L.map("trip-map", { scrollWheelZoom: false }).setView([35.4, 137.6], 7);

// add the map images from esri's free world street map.
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 18,
    attribution: "Tiles &copy; Esri"
}).addTo(map);

// this list collects each stop's coordinates so we can draw the route line
const routeCoords = [];

// add a marker with a popup for every stop
stops.forEach(function (stop) {
    L.marker(stop.coords).addTo(map).bindPopup("<h3>" + stop.name + "</h3><p>" + stop.text + "</p>");
    routeCoords.push(stop.coords);
});

// draw a dashed line connecting the stops in travel order
const routeLine = L.polyline(routeCoords, {
    color: "#3a5fb0",
    weight: 3,
    dashArray: "8 8"
}).addTo(map);

// zoom the map so the whole route fits on screen
map.fitBounds(routeLine.getBounds(), { padding: [30, 30] });


// chart.js (weather chart)
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// average temperatures in tokyo in degrees celsius
// https://www.data.jma.go.jp/stats/data/en/normal/normal.html
const avgHigh = [9.8, 10.9, 14.2, 19.4, 23.6, 26.1, 29.9, 31.3, 27.5, 22.0, 16.7, 12.0];
const avgLow = [1.2, 2.1, 5.0, 9.8, 14.6, 18.5, 22.4, 23.5, 20.3, 14.8, 8.8, 3.8];

const chartCanvas = document.getElementById("weather-chart");

new Chart(chartCanvas, {
    type: "line",
    data: {
        labels: months,
        datasets: [
            {
                label: "Average high (°C)",
                data: avgHigh,
                borderColor: "#5f86d6",
                backgroundColor: "rgba(95, 134, 214, 0.2)",
                fill: true,
                tension: 0.4   // makes the line curved instead of jagged
            },
            {
                label: "Average low (°C)",
                data: avgLow,
                borderColor: "#202020",
                backgroundColor: "rgba(32, 32, 32, 0.08)",
                fill: true,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,   // lets the chart fill the .chart-box height from the css
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Temperature (°C)"
                }
            }
        }
    }
});


// fslightbox full screen photo gallery
refreshFsLightbox();
