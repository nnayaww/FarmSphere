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
  
  // Load the simplified navbar and footer components
  document.addEventListener('DOMContentLoaded', () => {
    // Load simplified navbar component (weather-only)
    fetch('components/navbar.html')
      .then(response => response.text())
      .then(data => {
        // Create a simplified navbar with only weather focus
        const parser = new DOMParser();
        const navDoc = parser.parseFromString(data, 'text/html');
        
        // Remove or hide non-weather links if they exist
        const navLinks = navDoc.querySelectorAll('.nav-links a:not([href*="weather"])');
        navLinks.forEach(link => {
          link.style.display = 'none';
        });
        
        document.getElementById('navbar-container').innerHTML = navDoc.body.innerHTML;
      })
      .catch(error => {
        console.error('Error loading navbar component:', error);
        // Fallback simple navbar with just Farmsphere + Weather
        document.getElementById('navbar-container').innerHTML = `
          <nav class="navbar glass-panel">
            <div class="nav-content">
              <a href="index.html" class="logo">
                <span class="logo-icon">🌱</span>
                <span class="logo-text">Farmsphere</span>
              </a>
              <div class="nav-links">
                <a href="weather.html" class="active">Weather</a>
              </div>
            </div>
          </nav>
        `;
      });
  
    // Load simplified footer
    fetch('components/footer.html')
      .then(response => response.text())
      .then(data => {
        // Create a simplified footer with minimal links
        const parser = new DOMParser();
        const footerDoc = parser.parseFromString(data, 'text/html');
        
        // Keep only essential footer links
        const footerLinks = footerDoc.querySelectorAll('.footer-links a:not([href*="about"]):not([href*="contact"])');
        footerLinks.forEach(link => {
          link.style.display = 'none';
        });
        
        document.getElementById('footer-container').innerHTML = footerDoc.body.innerHTML;
        
        // Set current year in footer if the element exists
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
          yearElement.textContent = new Date().getFullYear();
        }
      })
      .catch(error => {
        console.error('Error loading footer component:', error);
        // Fallback simple footer
        document.getElementById('footer-container').innerHTML = `
          <footer class="footer glass-panel">
            <div class="footer-content">
              <div class="footer-info">
                <h3 class="footer-title">Farmsphere</h3>
                <p class="footer-tagline">Weather forecast service</p>
              </div>
            </div>
            <div class="footer-copyright">
              © ${new Date().getFullYear()} Farmsphere. All rights reserved.
            </div>
          </footer>
        `;
      });
  
    // Initially show loading state
    showLoadingState();
    
    // Simulate fetching data after a delay
    setTimeout(() => {
      // Hide loading and show weather data
      hideLoadingState();
      updateWeatherData(mockWeatherData);
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
    weatherDataElement.style.display = 'grid';
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
  
  // Update hourly forecast section
  function updateHourlyForecast(hourlyData) {
    hourlyForecastContainer.innerHTML = '';
    
    hourlyData.forEach((hour, index) => {
      const hourCard = document.createElement('div');
      hourCard.className = 'forecast-card';
      hourCard.style.animationDelay = `${0.1 * (index + 1)}s`;
      
      hourCard.innerHTML = `
        <div class="forecast-time">${hour.time}</div>
        <div class="weather-icon">${weatherIcons[hour.condition] || '☀️'}</div>
        <div class="forecast-temp">${hour.temperature}°</div>
      `;
      
      hourlyForecastContainer.appendChild(hourCard);
    });
  }
  
  // Update weekly forecast section
  function updateWeeklyForecast(weeklyData) {
    weeklyForecastContainer.innerHTML = '';
    
    weeklyData.forEach((day, index) => {
      const dayElement = document.createElement('div');
      dayElement.style.animationDelay = `${0.1 * (index + 1)}s`;
      
      dayElement.innerHTML = `
        <div class="forecast-day">
          <div class="forecast-day-info">
            <div class="weather-icon">${weatherIcons[day.condition] || '☀️'}</div>
            <div class="forecast-day-date">
              <div class="forecast-day-name">${day.day}</div>
              <div class="forecast-day-text">${day.date}</div>
            </div>
          </div>
          <div class="forecast-day-temp">
            ${day.highTemp}°/${day.lowTemp}°
          </div>
        </div>
      `;
      
      weeklyForecastContainer.appendChild(dayElement);
      
      // Add divider except for the last item
      if (index < weeklyData.length - 1) {
        const divider = document.createElement('div');
        divider.className = 'daily-divider';
        weeklyForecastContainer.appendChild(divider);
      }
    });
  }
  
  // Show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add the notification to the DOM
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  // Add notification styles - append to existing CSS
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: rgba(0, 100, 0, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transform: translateY(-20px);
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .notification.show {
      transform: translateY(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
  