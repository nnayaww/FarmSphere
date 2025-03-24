// Weather Icons mapping
const weatherIcons = {
  'Sunny': '☀️',
  'Clear': '☀️',
  'Partly cloudy': '⛅',
  'Cloudy': '☁️',
  'Overcast': '☁️',
  'Mist': '🌫️',
  'Patchy rain possible': '🌦️',
  'Patchy snow possible': '🌨️',
  'Patchy sleet possible': '🌨️',
  'Patchy freezing drizzle possible': '🌧️',
  'Thundery outbreaks possible': '⛈️',
  'Blowing snow': '❄️',
  'Blizzard': '❄️',
  'Fog': '🌫️',
  'Freezing fog': '🌫️',
  'Patchy light drizzle': '🌧️',
  'Light drizzle': '🌧️',
  'Freezing drizzle': '🌧️',
  'Heavy freezing drizzle': '🌧️',
  'Patchy light rain': '🌦️',
  'Light rain': '🌦️',
  'Moderate rain at times': '🌧️',
  'Moderate rain': '🌧️',
  'Heavy rain at times': '🌧️',
  'Heavy rain': '🌧️',
  'Light freezing rain': '🌧️',
  'Moderate or heavy freezing rain': '🌧️',
  'Light sleet': '🌨️',
  'Moderate or heavy sleet': '🌨️',
  'Patchy light snow': '🌨️',
  'Light snow': '🌨️',
  'Patchy moderate snow': '🌨️',
  'Moderate snow': '🌨️',
  'Patchy heavy snow': '❄️',
  'Heavy snow': '❄️',
  'Ice pellets': '🧊',
  'Light rain shower': '🌦️',
  'Moderate or heavy rain shower': '🌧️',
  'Torrential rain shower': '🌧️',
  'Light sleet showers': '🌨️',
  'Moderate or heavy sleet showers': '🌨️',
  'Light snow showers': '🌨️',
  'Moderate or heavy snow showers': '❄️',
  'Light showers of ice pellets': '🧊',
  'Moderate or heavy showers of ice pellets': '🧊',
  'Patchy light rain with thunder': '⛈️',
  'Moderate or heavy rain with thunder': '⛈️',
  'Patchy light snow with thunder': '⛈️',
  'Moderate or heavy snow with thunder': '⛈️',
  'Rainy': '🌧️',
  'Storm': '⛈️'
};

// Mock weather data for demonstration
const mockWeatherData = {
  location: "Farmsphere Headquarters",
  temperature: 31,
  condition: "Sunny",
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  feelsLike: 30,
  wind: 5,
  humidity: 45,
  uvIndex: 3,
  chanceOfRain: 0,
  hourlyForecast: [
    { time: "06:00", temperature: 25, condition: "Cloudy" },
    { time: "09:00", temperature: 28, condition: "Partly cloudy" },
    { time: "12:00", temperature: 32, condition: "Sunny" },
    { time: "15:00", temperature: 33, condition: "Sunny" },
    { time: "18:00", temperature: 30, condition: "Partly cloudy" },
  ],
  weeklyForecast: [
    { day: "Today", date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), condition: "Sunny", highTemp: 33, lowTemp: 25 },
    { day: "Mon", date: new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), condition: "Rainy", highTemp: 30, lowTemp: 24 },
    { day: "Tue", date: new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), condition: "Sunny", highTemp: 32, lowTemp: 23 },
    { day: "Wed", date: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), condition: "Cloudy", highTemp: 29, lowTemp: 22 },
    { day: "Thu", date: new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), condition: "Sunny", highTemp: 31, lowTemp: 24 },
    { day: "Fri", date: new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), condition: "Cloudy", highTemp: 28, lowTemp: 22 },
    { day: "Sat", date: new Date(Date.now() + 6 * 86400000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), condition: "Storm", highTemp: 27, lowTemp: 21 },
  ]
};

// DOM Elements
const loadingElement = document.getElementById('loading');
const weatherDataElement = document.getElementById('weather-data');
const searchForm = document.getElementById('search-form');
const locationInput = document.getElementById('location-input');
const currentDateElement = document.getElementById('current-date');
const locationNameElement = document.getElementById('location-name');
const temperatureElement = document.getElementById('temperature');
const weatherIconElement = document.getElementById('weather-icon');
const conditionElement = document.getElementById('condition');
const feelsLikeElement = document.getElementById('feels-like');
const windElement = document.getElementById('wind');
const rainChanceElement = document.getElementById('rain-chance');
const uvIndexElement = document.getElementById('uv-index');
const hourlyForecastContainer = document.getElementById('hourly-forecast-container');
const weeklyForecastContainer = document.getElementById('weekly-forecast-container');
const currentYearElement = document.getElementById('current-year');

// Load components
document.addEventListener('DOMContentLoaded', () => {
  // Load navbar
  fetch('../components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
      // Initialize navbar if needed
      if (typeof initNavbar === 'function') {
        initNavbar();
      }
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      document.getElementById('navbar-container').innerHTML = '<div class="error-message">Error loading navigation</div>';
    });

  // Load footer
  fetch('../components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
      // Initialize footer if needed
      if (typeof initFooter === 'function') {
        initFooter();
      }
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      document.getElementById('footer-container').innerHTML = '<div class="error-message">Error loading footer</div>';
    });

  // Initially show loading state
  showLoadingState();

  // Simulate fetching data after a delay
  setTimeout(() => {
    // Hide loading and show weather data
    hideLoadingState();
    updateWeatherData(mockWeatherData);

    // Initialize scroll animations
    initScrollAnimations();
  }, 1500);
});

// Handle search form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();

  if (location) {
    // Show loading state
    showLoadingState();

    // Simulate search API call
    setTimeout(() => {
      // Hide loading and update with "new" data
      hideLoadingState();

      // Create a copy of mock data but update the location
      const searchData = {
        ...mockWeatherData,
        location: location
      };

      // Update UI with new data
      updateWeatherData(searchData);

      // Show search success message
      showNotification(`Weather updated for ${location}`);
    }, 1000);
  }
});

// Show loading state
function showLoadingState() {
  loadingElement.style.display = 'flex';
  weatherDataElement.style.display = 'none';
}

// Hide loading state
function hideLoadingState() {
  loadingElement.style.display = 'none';
  weatherDataElement.style.display = 'block';
}

// Update weather display with data
function updateWeatherData(data) {
  // Update main weather display
  currentDateElement.textContent = data.date;
  locationNameElement.textContent = data.location;
  temperatureElement.textContent = `${data.temperature}°`;
  weatherIconElement.textContent = weatherIcons[data.condition] || '☀️';
  conditionElement.textContent = data.condition;

  // Update weather highlights
  feelsLikeElement.textContent = `${data.feelsLike}°`;
  windElement.textContent = `${data.wind} km/h`;
  rainChanceElement.textContent = `${data.chanceOfRain}%`;
  uvIndexElement.textContent = data.uvIndex;

  // Update hourly forecast
  updateHourlyForecast(data.hourlyForecast);

  // Update weekly forecast
  updateWeeklyForecast(data.weeklyForecast);
}

// Update hourly forecast display
function updateHourlyForecast(hourlyData) {
  hourlyForecastContainer.innerHTML = hourlyData.map(hour => `
    <div class="forecast-card glass-panel">
      <div class="forecast-time">${hour.time}</div>
      <div class="weather-icon">${weatherIcons[hour.condition] || '☀️'}</div>
      <div class="forecast-temp">${hour.temperature}°</div>
    </div>
  `).join('');
}

// Update weekly forecast display
function updateWeeklyForecast(weeklyData) {
  weeklyForecastContainer.innerHTML = weeklyData.map(day => `
    <div class="forecast-day">
      <div class="forecast-day-info">
        <div class="weather-icon">${weatherIcons[day.condition] || '☀️'}</div>
        <div class="forecast-day-date">
          <div class="forecast-day-name">${day.day}</div>
          <div class="forecast-day-text">${day.date}</div>
        </div>
      </div>
      <div class="forecast-day-temp">
        <span class="high-temp">${day.highTemp}°</span>
        <span class="low-temp">${day.lowTemp}°</span>
      </div>
    </div>
    ${day !== weeklyData[weeklyData.length - 1] ? '<hr class="daily-divider">' : ''}
  `).join('');
}

// Show notification message
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Trigger reflow
  notification.offsetHeight;

  // Show notification
  notification.classList.add('show');

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}
