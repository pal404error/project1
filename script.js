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
});