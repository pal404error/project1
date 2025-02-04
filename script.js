document.addEventListener("DOMContentLoaded", function () {
    function updateClock() {
        const now = new Date();
        document.getElementById("clock").textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = data.content;
        });

    function addTask() {
        const taskInput = document.getElementById("new-task");
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskList = document.getElementById("tasks");
            const li = document.createElement("li");
            li.textContent = taskText;

            // Add remove button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.style.marginLeft = "10px";
            removeBtn.onclick = function () {
                li.remove();
                saveTasks();
            };
            li.appendChild(removeBtn);

            taskList.appendChild(li);
            taskInput.value = "";
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#tasks li").forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const taskList = document.getElementById("tasks");
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.style.marginLeft = "10px";
            removeBtn.onclick = function () {
                li.remove();
                saveTasks();
            };
            li.appendChild(removeBtn);

            taskList.appendChild(li);
        });
    }

    function changeBackground() {
        const color = document.getElementById("bg-color").value;
        document.body.style.backgroundColor = color;
        localStorage.setItem("backgroundColor", color);
    }

    function loadBackground() {
        const savedColor = localStorage.getItem("backgroundColor");
        if (savedColor) {
            document.body.style.backgroundColor = savedColor;
            document.getElementById("bg-color").value = savedColor;
        }
    }

    document.getElementById("bg-color").addEventListener("input", changeBackground);

    window.addTask = addTask;
    window.changeBackground = changeBackground;
    
    loadTasks();
    loadBackground();
});