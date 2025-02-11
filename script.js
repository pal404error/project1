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


//try end

// weather try start

// const url =
// 	'https://api.openweathermap.org/data/2.5/weather';
// const apiKey =
// 	'f00c38e0279b7bc85480c3fe775d518c';

//   document.addEventListener('DOMContentLoaded', function () {
//     weatherFn('vadodara');
// });

// async function weatherFn(cName) {
//     const temp = `${url}?q=${'vadodara'}&appid=${apiKey}&units=metric`;
//     try {
//         const res = await fetch(temp);
//         const data = await res.json();
//         if (res.ok) {
//             weatherShowFn(data);
//         } else {
//             alert('City not found. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//     }
// }


// function weatherShowFn(data) {
// 	$('#city-name').text(data.name);
// 	$('#date').text(moment().
// 		format('MMMM Do YYYY, h:mm:ss a'));
// 	$('#temperature').
// 		html(`${data.main.temp}°C`);
// 	$('#description').
// 		text(data.weather[0].description);
// 	$('#wind-speed').
// 		html(`Wind Speed: ${data.wind.speed} m/s`);
// 	$('#weather-icon').
// 		attr('src',
// 			`...`);
// 	$('#weather-info').fadeIn();
// }


