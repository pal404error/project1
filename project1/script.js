
const WEATHER_API_KEY = '08e262942a75425b206f76950a964fcf'; 

const CITY = 'Vadodara';
const COUNTRY_CODE = 'IN';


async function getWeather() {
    try {
        const response = await fetch(`https:
        
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        
        console.log('Weather data:', data);

        
        if (data && data.main && data.weather && data.weather[0]) {
            
            document.getElementById('date').textContent = new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('wind-speed').textContent = `Wind: ${data.wind.speed} m/s`;
            
            
            const iconCode = data.weather[0].icon;
            const iconUrl = `https:
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


getWeather();
setInterval(getWeather, 30 * 60 * 1000);




document.addEventListener("DOMContentLoaded", function () {
    updateClock();
    setInterval(updateClock, 1000);

    function updateClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        
        const secondsDegrees = ((seconds / 60) * 360) + 180;
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 180;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 180;

        
        const secondHand = document.getElementById('second-hand');
        const minuteHand = document.getElementById('minute-hand');
        const hourHand = document.getElementById('hour-hand');

        if (secondHand && minuteHand && hourHand) {
            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
            minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
            hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
        }
    }

    
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

    
    document.getElementById("bg-color").addEventListener("input", function () {
        document.body.style.backgroundColor = this.value;
    });
});



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

  
  inputBox.value = " ";

  
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  
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


inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});





function search() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();
  
  if (searchQuery) {
      
      const searchUrl = `https:
      window.open(searchUrl, '_blank');
      searchInput.value = ''; 
  }
}


document.getElementById('search-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      search();
  }
});


function initializeBackgroundSettings() {
  const bgColorPicker = document.getElementById('bg-color');
  const dashboard = document.getElementById('dashboard');
  
  
  const savedBgColor = localStorage.getItem('dashboardBgColor');
  if (savedBgColor) {
      document.body.style.background = savedBgColor;
      bgColorPicker.value = savedBgColor;
  }

  
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

  
  const savedBgStyle = localStorage.getItem('dashboardBgStyle') || 'gradient1';
  bgStyleSelect.value = savedBgStyle;

  
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
  
  
  const widgets = document.querySelectorAll('.widget');
  widgets.forEach(widget => {
      widget.style.backgroundColor = `rgba(255, 255, 255, ${opacity / 100})`;
  });

  
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


document.addEventListener('DOMContentLoaded', initializeBackgroundSettings);



async function getQuotes() {
  try {
      
      const response = await fetch('https:
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const quotes = await response.json();
      
      
      const quoteElement = document.getElementById('quote');
      quoteElement.innerHTML = `
          <p>${quotes[0].content}</p>
          <p style="color: var(--primary-color); font-weight: 500; margin-top: 10px;">
              — ${quotes[0].author}
          </p>
      `;
      
      
      const quoteText2 = document.getElementById('quote-text-2');
      const quoteAuthor2 = document.getElementById('quote-author-2');
      
      if (quoteText2 && quoteAuthor2) {
          quoteText2.textContent = quotes[1].content;
          quoteAuthor2.textContent = `— ${quotes[1].author}`;
      }

  } catch (error) {
      console.error('Error fetching quotes:', error);
      
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


getQuotes();


setInterval(getQuotes, 30 * 60 * 1000);


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