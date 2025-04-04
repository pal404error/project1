// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLyKfMBHyrSxVUsae0s4bQ4-13NJJfx80",
    authDomain: "proj1-da504.firebaseapp.com",
    projectId: "proj1-da504",
    storageBucket: "proj1-da504.firebasestorage.app",
    messagingSenderId: "530189704919",
    appId: "1:530189704919:web:90f5ac352c6915ca891a92",
    databaseURL: "https://proj1-da504-default-rtdb.firebaseio.com"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

let currentUser = null;
let activeTabId = null;
let activeTabDomain = null;
let trackingInterval = null;

// Helper functions
function debugLog(message, data = '') {
    console.log(`[DEBUG] ${message}`, data);
}

function getDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDomainFromUrl(url) {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch (e) {
        return null;
    }
}

// Track active tab changes
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.url) {
            activeTabId = tab.id;
            activeTabDomain = getDomainFromUrl(tab.url);
        }
    });
});

// Track URL changes
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        activeTabId = tabId;
        activeTabDomain = getDomainFromUrl(change.url);
    }
});

function encodeDomain(domain) {
    return domain.replace(/\./g, ',');
}

function decodeDomain(encodedDomain) {
    return encodedDomain.replace(/,/g, '.');
}

function updateTimeInFirebase(domain) {
    if (!currentUser || !domain) return;

    const today = getDateString(new Date());
    const encodedDomain = encodeDomain(domain);
    const userDayRef = database.ref(`users/${currentUser.uid}/days/${today}/${encodedDomain}`);
    
    userDayRef.transaction((currentTime) => {
        return (currentTime || 0) + 1;
    });
}

function startTracking() {
    if (trackingInterval) {
        clearInterval(trackingInterval);
    }

    trackingInterval = setInterval(() => {
        if (activeTabDomain && currentUser) {
            updateTimeInFirebase(activeTabDomain);
        }
    }, 1000);
}

function stopTracking() {
    if (trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
    }
}

// Auth state observer
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        startTracking();
    } else {
        currentUser = null;
        stopTracking();
    }
});

// Handle browser startup
chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0] && tabs[0].url) {
      activeTabDomain = getDomainFromUrl(tabs[0].url);
      activeTabId = tabs[0].id;
      console.log('Browser startup, initial domain:', activeTabDomain);
    }
  });
});

// Handle extension install/update
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0] && tabs[0].url) {
      activeTabDomain = getDomainFromUrl(tabs[0].url);
      activeTabId = tabs[0].id;
      console.log('Extension installed/updated, initial domain:', activeTabDomain);
    }
  });
});

// Also scan tabs when window focus changes
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    debugLog('Window focus changed, rescanning tabs');
    scanAllTabs();
  }
});

// And when tabs are activated
chrome.tabs.onActivated.addListener(() => {
  debugLog('Tab activated, rescanning tabs');
  scanAllTabs();
});

