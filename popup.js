// Add these helper functions at the top of popup.js
function debugLog(message, data = '') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    
    if (data) {
        console.log(logMessage, data);
    } else {
        console.log(logMessage);
    }
}

function getDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function secondsToString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    let timeString = [];
    if (hours > 0) timeString.push(`${hours}h`);
    if (minutes > 0) timeString.push(`${minutes}m`);
    if (secs > 0 || timeString.length === 0) timeString.push(`${secs}s`);
    
    return timeString.join(' ');
}

// Add the helper functions
function encodeDomain(domain) {
    return domain.replace(/\./g, ',');
}

function decodeDomain(encodedDomain) {
    return encodedDomain.replace(/,/g, '.');
}

// Add this at the top of your popup.js
const productiveDomains = [
    'github.com',
    'stackoverflow.com',
    'docs.google.com',
    'linkedin.com',
    'coursera.org',
    'udemy.com',
    'medium.com',
    'dev.to',
    'gmail.com',
    'github.dev',
    'firebase.google.com',
    'notion.so',
    'trello.com',
    'slack.com',
    'zoom.us',
    'calendly.com',
    'w3schools.com',
    'khanacademy.org',
    'asana.com',
    'clickup.com',
    'openai.com'
];


const unproductiveDomains = [
    'youtube.com',
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'reddit.com',
    'netflix.com',
    'tiktok.com',
    'pinterest.com',
    '9gag.com',
    'twitch.tv',
    'buzzfeed.com',
    'discord.com',
    'primevideo.com',
    'hotstar.com',
    'quora.com',
    'imdb.com',
    'tumblr.com'
];


// Wrap Firebase initialization in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBLyKfMBHyrSxVUsae0s4bQ4-13NJJfx80",
    authDomain: "proj1-da504.firebaseapp.com",
    projectId: "proj1-da504",
    storageBucket: "proj1-da504.firebasestorage.app",
    messagingSenderId: "530189704919",
    appId: "1:530189704919:web:90f5ac352c6915ca891a92",
    // Add this line for Realtime Database
    databaseURL: "https://proj1-da504-default-rtdb.firebaseio.com" // Replace with your database URL
  };

  // Initialize Firebase if not already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const database = firebase.database();

  // Get DOM elements - Add null checks
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const signInButton = document.getElementById('signInButton');
  const signUpButton = document.getElementById('signUpButton');
  const signOutButton = document.getElementById('signOutButton');
  const authError = document.getElementById('authError');

  let chart = null;

  function updateChart(data) {
    const canvas = document.getElementById('pie-chart');
    if (!canvas) return;

    // Add check for Chart
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Destroy existing chart if it exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    const topData = data.slice(0, 10);
    
    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: topData.map(item => item.domain),
            datasets: [{
                data: topData.map(item => item.time),
                backgroundColor: [
                    '#2196F3', '#FF4081', '#4CAF50', '#FFC107', '#9C27B0',
                    '#FF5722', '#00BCD4', '#795548', '#607D8B', '#E91E63'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
  }

  function updateTable(data) {
    const tbody = document.getElementById('webList');
    if (!tbody) {
        console.log('Table body not found');
        return;
    }

    tbody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank">${index + 1}</td>
            <td class="domain">${item.domain}</td>
            <td class="time">${secondsToString(item.time)}</td>
        `;
        tbody.appendChild(row);
    });
  }

  function updateOverviewChart(data) {
    const canvas = document.getElementById('pie-chart');
    if (!canvas) {
        console.log('Chart canvas not found');
        return;
    }

    if (window.overviewChart) {
        window.overviewChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    const topData = data.slice(0, 10);
    
    window.overviewChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: topData.map(item => item.domain),
            datasets: [{
                data: topData.map(item => item.time),
                backgroundColor: [
                    '#2196F3', '#FF4081', '#4CAF50', '#FFC107', '#9C27B0',
                    '#FF5722', '#00BCD4', '#795548', '#607D8B', '#E91E63'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
  }

  function updateOverviewTab(data, totalTime) {
    const totalTimeElement = document.getElementById('totalTimeToday');
    if (totalTimeElement) {
        totalTimeElement.textContent = secondsToString(totalTime);
    }

    const sortedData = Object.entries(data)
        .map(([domain, time]) => ({ domain, time }))
        .sort((a, b) => b.time - a.time);

    updateOverviewChart(sortedData);
    updateTable(sortedData);
  }

  function loadUserData(userId) {
    const today = getDateString(new Date());
    const userDayRef = database.ref(`users/${userId}/days/${today}`);
    
    userDayRef.on('value', (snapshot) => {
        const rawData = snapshot.val() || {};
        
        let productiveTime = 0;
        let unproductiveTime = 0;
        let totalTime = 0;
        
        const data = {};
        Object.entries(rawData).forEach(([encodedDomain, time]) => {
            const domain = decodeDomain(encodedDomain);
            data[domain] = time;
            totalTime += time;

            if (productiveDomains.some(pd => domain.includes(pd))) {
                productiveTime += time;
            } else if (unproductiveDomains.some(ud => domain.includes(ud))) {
                unproductiveTime += time;
            }
        });

        updateOverviewTab(data, totalTime);
        updateProductivityTab(productiveTime, unproductiveTime, totalTime);
    });

    // Get all dates for the user - with null checks and error handling
    const userDaysRef = database.ref(`users/${userId}/days`);
    userDaysRef.once('value').then((snapshot) => {
        const dateSelector = document.getElementById("dateValue");
        const dateSubmit = document.getElementById("dateSubmit");
        const tryAgain = document.getElementById("tryAgain");

        // Only proceed with date handling if the elements exist
        if (dateSelector && dateSubmit) {
      const datesStored = Object.keys(snapshot.val() || {});
            if (datesStored.length > 0) {
      datesStored.sort();
        let minDate = datesStored[0];
        let maxDate = datesStored[datesStored.length-1];
                dateSelector.min = minDate;
                dateSelector.max = maxDate;
            }

            // Add event listener only if both elements exist
            dateSubmit.addEventListener('click', function() {
                if (dateSelector.value === "") {
                    if (tryAgain) {
                        tryAgain.textContent = "Invalid date! Please try again.";
                        tryAgain.classList.remove("d-none");
                    }
      } else {
                    if (tryAgain) {
                        tryAgain.classList.add("d-none");
                    }
                    let givenDate = dateSelector.value;
        
        // Fetch specific date data
        const specificDateRef = database.ref(`users/${userId}/days/${givenDate}`);
        specificDateRef.once('value').then((snapshot) => {
          const thatDay = snapshot.val();
          if (!thatDay) {
                            if (tryAgain) {
                                tryAgain.textContent = "No records exist for this day!";
                                tryAgain.classList.remove("d-none");
                            }
          } else {
            updateHistoricalData(thatDay, givenDate);
          }
        });
      }
            });
        }
    }).catch(error => {
        console.error('Error loading dates:', error);
    });

    // Week tab click handler
    document.getElementById('weekTab').addEventListener('click', function() {
      const userDaysRef = database.ref(`users/${userId}/days`);
      userDaysRef.once('value').then((snapshot) => {
        const storedItems = snapshot.val() || {};
        const datesList = Object.keys(storedItems);
        datesList.sort();
        
        updateWeeklyChart(storedItems, datesList);
      });
    });
  }

  function updateHistoricalData(data, date) {
    // Implementation of historical data update
    console.log('Updating historical data for:', date, data);
    // Add your implementation here
  }

  function updateWeeklyChart(storedItems, datesList) {
    // Implementation of updateWeeklyChart function
  }

  document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
    
    var collapsibles = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibles);
  });

  // Add null checks before adding event listeners
  if (signInButton) {
    signInButton.addEventListener('click', () => {
      if (emailInput && passwordInput) {
        firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .catch(error => {
                if (authError) {
                    authError.textContent = error.message;
                }
            });
      }
    });
  }

  if (signUpButton) {
    signUpButton.addEventListener('click', () => {
      if (emailInput && passwordInput) {
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
            .catch(error => {
                if (authError) {
                    authError.textContent = error.message;
                }
            });
      }
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener('click', () => {
      firebase.auth().signOut();
    });
  }

  // Fix tab switching - Add this at the beginning after Firebase initialization
  function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log('Found tabs:', tabs.length);  // Debug log

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        console.log('Tab clicked:', tab.dataset.tab);  // Debug log
        
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const contentId = tab.dataset.tab;
        const content = document.getElementById(contentId);
        if (content) {
          content.classList.add('active');
        }
      });
    });
  }

  // Add CSS for tab visibility
  const style = document.createElement('style');
  style.textContent = `
    .tab-content {
        display: none;
    }
    .tab-content.active {
        display: block;
    }
  `;
  document.head.appendChild(style);

  // Update auth state observer to initialize tabs after content is shown
  firebase.auth().onAuthStateChanged((user) => {
    const loginSection = document.getElementById('loginSection');
    const mainContent = document.getElementById('mainContent');

    if (user) {
      if (loginSection) loginSection.style.display = 'none';
      if (mainContent) mainContent.style.display = 'block';
      initializeTabs();  // Initialize tabs after content is shown
      loadUserData(user.uid);
    } else {
      if (loginSection) loginSection.style.display = 'block';
      if (mainContent) mainContent.style.display = 'none';
    }
  });
});

function updateProductivityTab(productiveTime, unproductiveTime, totalTime) {
    // Update productive time
    const productiveTimeElement = document.getElementById('productiveTime');
    const productivePercentElement = document.getElementById('productivePercentage');
    const productiveBarElement = document.getElementById('productiveBar');

    // Update unproductive time
    const unproductiveTimeElement = document.getElementById('unproductiveTime');
    const unproductivePercentElement = document.getElementById('unproductivePercentage');
    const unproductiveBarElement = document.getElementById('unproductiveBar');

    if (totalTime > 0) {
        const productivePercent = Math.round((productiveTime / totalTime) * 100);
        const unproductivePercent = Math.round((unproductiveTime / totalTime) * 100);

        if (productiveTimeElement) productiveTimeElement.textContent = secondsToString(productiveTime);
        if (productivePercentElement) productivePercentElement.textContent = `${productivePercent}%`;
        if (productiveBarElement) productiveBarElement.style.width = `${productivePercent}%`;

        if (unproductiveTimeElement) unproductiveTimeElement.textContent = secondsToString(unproductiveTime);
        if (unproductivePercentElement) unproductivePercentElement.textContent = `${unproductivePercent}%`;
        if (unproductiveBarElement) unproductiveBarElement.style.width = `${unproductivePercent}%`;

        // Update productivity chart
        updateProductivityChart(productiveTime, unproductiveTime, totalTime);
    }
}

function updateProductivityChart(productiveTime, unproductiveTime, totalTime) {
    const canvas = document.getElementById('productivity-chart');
    if (!canvas) return;

    if (window.productivityChart) {
        window.productivityChart.destroy();
    }

    const neutralTime = totalTime - (productiveTime + unproductiveTime);

    window.productivityChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Productive', 'Unproductive', 'Neutral'],
            datasets: [{
                data: [productiveTime, unproductiveTime, neutralTime],
                backgroundColor: ['#30D158', '#FF453A', '#8E8E93'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        font: {
                            family: 'SF Pro Display',
                            size: 12
                        },
                        boxWidth: 12,
                        padding: 15
                    }
                }
            },
            cutout: '75%'
        }
    });
}