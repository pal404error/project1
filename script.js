// Weather API configuration
const WEATHER_API_KEY = '08e262942a75425b206f76950a964fcf'; // You'll need to get an API key from OpenWeatherMap
// Weather API configuration e with your actual API key
const CITY = 'Vadodara';
const COUNTRY_CODE = 'IN';

// Function to fetch weather data
async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&appid=${WEATHER_API_KEY}&units=metric`);
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Debug log - check what data we're receiving
        console.log('Weather data:', data);

        // Check if we have all the required data before updating the DOM
        if (data && data.main && data.weather && data.weather[0]) {
            // Update weather information
            document.getElementById('date').textContent = new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('wind-speed').textContent = `Wind: ${data.wind.speed} m/s`;
            
            // Update weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.src = iconUrl;
            weatherIcon.alt = data.weather[0].description;
            
        } else {
            throw new Error('Weather data is incomplete');
        }
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').innerHTML = `
            <p style="color: red; padding: 20px;">
                Unable to fetch weather data. Please check your API key and try again.
            </p>`;
    }
}

// Update weather immediately and then every 30 minutes
getWeather();
setInterval(getWeather, 30 * 60 * 1000);

// var $ = jQuery;
// $(document).ready(function(){  });

document.addEventListener("DOMContentLoaded", function () {
    updateClock();
    setInterval(updateClock, 1000);

    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const hourDeg = (360 / 12) * hours + (30 / 60) * minutes;
        const minuteDeg = (360 / 60) * minutes + (6 / 60) * seconds;
        const secondDeg = (360 / 60) * seconds;

        document.getElementById("hour-hand").style.transform = `rotate(${hourDeg}deg)`;
        document.getElementById("minute-hand").style.transform = `rotate(${minuteDeg}deg)`;
        document.getElementById("second-hand").style.transform = `rotate(${secondDeg}deg)`;
    }

    // To-Do List Functionality
    var myNodelist = document.getElementsByTagName("LI");
    for (var i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    document.querySelector('ul').addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

function newElement() {
        
        var li = document.createElement("li");
        var inputValue = document.getElementById("myInput").value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        if (inputValue === '') {
          alert("You must write something!");
        } else {
          document.getElementById("myUL").appendChild(li);
        }
        document.getElementById("myInput").value = "";
      
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
      
        for (i = 0; i < close.length; i++) {
          close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
          }
        }
      }

    // Background Color Changer
    document.getElementById("bg-color").addEventListener("input", function () {
        document.body.style.backgroundColor = this.value;
    });
});


//try start
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    console.log("no task added");

    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
    `;

  listContainer.appendChild(li);

  // clear the input field
  inputBox.value = " ";

  // attach event listeners to the new task
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  // strike out the completed task
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
}

// add task when pressing Enter key
inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


// ... existing weather code remains the same ...

// Search Bar Functionality
function search() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();
  
  if (searchQuery) {
      // Default to Google search, but you can change this to any search engine
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.open(searchUrl, '_blank');
      searchInput.value = ''; // Clear the input after search
  }
}

// Add event listener for Enter key in search input
document.getElementById('search-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      search();
  }
});

// Background Settings Functionality
function initializeBackgroundSettings() {
  const bgColorPicker = document.getElementById('bg-color');
  const dashboard = document.getElementById('dashboard');
  
  // Load saved background color from localStorage
  const savedBgColor = localStorage.getItem('dashboardBgColor');
  if (savedBgColor) {
      document.body.style.background = savedBgColor;
      bgColorPicker.value = savedBgColor;
  }

  // Add background style options
  const bgStyleSelect = document.createElement('select');
  bgStyleSelect.id = 'bg-style';
  bgStyleSelect.className = 'bg-setting-input';
  
  const styles = [
      { value: 'solid', text: 'Solid Color' },
      { value: 'gradient1', text: 'Gradient 1' },
      { value: 'gradient2', text: 'Gradient 2' },
      { value: 'gradient3', text: 'Gradient 3' }
  ];

  styles.forEach(style => {
      const option = document.createElement('option');
      option.value = style.value;
      option.textContent = style.text;
      bgStyleSelect.appendChild(option);
  });

  // Load saved background style
  const savedBgStyle = localStorage.getItem('dashboardBgStyle') || 'gradient1';
  bgStyleSelect.value = savedBgStyle;

  // Add the select element to background settings
  const backgroundSettings = document.getElementById('background-settings');
  backgroundSettings.innerHTML = `
      <h3>Customize Background</h3>
      <div class="bg-setting-group">
          <label for="bg-color">Color:</label>
          <input type="color" id="bg-color" class="bg-setting-input">
      </div>
      <div class="bg-setting-group">
          <label for="bg-style">Style:</label>
          ${bgStyleSelect.outerHTML}
      </div>
      <div class="bg-setting-group">
          <label for="bg-opacity">Opacity:</label>
          <input type="range" id="bg-opacity" min="0" max="100" value="95" class="bg-setting-input">
      </div>
      <button id="reset-bg" class="bg-setting-button">Reset to Default</button>
  `;

  // Event Listeners for background settings
  document.getElementById('bg-color').addEventListener('input', updateBackground);
  document.getElementById('bg-style').addEventListener('change', updateBackground);
  document.getElementById('bg-opacity').addEventListener('input', updateBackground);
  document.getElementById('reset-bg').addEventListener('click', resetBackground);
}

function updateBackground() {
  const color = document.getElementById('bg-color').value;
  const style = document.getElementById('bg-style').value;
  const opacity = document.getElementById('bg-opacity').value;
  
  let background;
  switch(style) {
      case 'solid':
          background = color;
          break;
      case 'gradient1':
          background = `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -30)} 100%)`;
          break;
      case 'gradient2':
          background = `linear-gradient(45deg, ${color} 0%, ${adjustColor(color, 30)} 100%)`;
          break;
      case 'gradient3':
          background = `radial-gradient(circle, ${color} 0%, ${adjustColor(color, -40)} 100%)`;
          break;
  }

  document.body.style.background = background;
  
  // Update widget transparency
  const widgets = document.querySelectorAll('.widget');
  widgets.forEach(widget => {
      widget.style.backgroundColor = `rgba(255, 255, 255, ${opacity / 100})`;
  });

  // Save settings
  localStorage.setItem('dashboardBgColor', color);
  localStorage.setItem('dashboardBgStyle', style);
  localStorage.setItem('dashboardOpacity', opacity);
}

function adjustColor(color, amount) {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function resetBackground() {
  const defaultColor = '#f5f7fa';
  const defaultStyle = 'gradient1';
  const defaultOpacity = 95;

  document.getElementById('bg-color').value = defaultColor;
  document.getElementById('bg-style').value = defaultStyle;
  document.getElementById('bg-opacity').value = defaultOpacity;

  updateBackground();
}

// Initialize background settings when the page loads
document.addEventListener('DOMContentLoaded', initializeBackgroundSettings);


// Function to fetch quotes
async function getQuotes() {
  try {
      // Using proxy to handle CORS
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.quotable.io/quotes/random?limit=2', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const quotes = await response.json();
      
      // Update first quote widget with loading state
      const quoteElement = document.getElementById('quote');
      quoteElement.innerHTML = `
          <p>${quotes[0].content}</p>
          <p style="color: var(--primary-color); font-weight: 500; margin-top: 10px;">
              — ${quotes[0].author}
          </p>
      `;
      
      // Update second quote widget
      const quoteText2 = document.getElementById('quote-text-2');
      const quoteAuthor2 = document.getElementById('quote-author-2');
      
      if (quoteText2 && quoteAuthor2) {
          quoteText2.textContent = quotes[1].content;
          quoteAuthor2.textContent = `— ${quotes[1].author}`;
      }

  } catch (error) {
      console.error('Error fetching quotes:', error);
      // Fallback quotes in case of API failure
      const fallbackQuotes = [
          {
              content: "The best way to predict the future is to create it.",
              author: "Peter Drucker"
          },
          {
              content: "Innovation distinguishes between a leader and a follower.",
              author: "Steve Jobs"
          }
      ];

      // Update with fallback quotes
      document.getElementById('quote').innerHTML = `
          <p>${fallbackQuotes[0].content}</p>
          <p style="color: var(--primary-color); font-weight: 500; margin-top: 10px;">
              — ${fallbackQuotes[0].author}
          </p>
      `;
      
      document.getElementById('quote-text-2').textContent = fallbackQuotes[1].content;
      document.getElementById('quote-author-2').textContent = `— ${fallbackQuotes[1].author}`;
  }
}

// Initial quote load
getQuotes();

// Update quotes every 30 minutes
setInterval(getQuotes, 30 * 60 * 1000);

// Add loading animation CSS
const style = document.createElement('style');
style.textContent = `
  .quote-loading {
      opacity: 0.7;
      transition: opacity 0.3s;
  }
  
  @keyframes loadingPulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
  }
`;
document.head.appendChild(style);