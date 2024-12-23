// Initial Stats
let level = 1;
let xp = 0;
let xpToNext = 100;

// List of tasks
const tasks = [
    { name: "10 Push-ups", xp: 20 },
    { name: "15 Sit-ups", xp: 25 },
    { name: "Run for 1 km", xp: 50 },
    { name: "10 Squats", xp: 15 },
    { name: "5 Pull-ups", xp: 30 },
    { name: "20 Jumping Jacks", xp: 10 },
    { name: "Plank for 1 Minute", xp: 40 },
    { name: "30-Second Sprint", xp: 35 }
];

// DOM Elements
const levelDisplay = document.getElementById("level");
const xpDisplay = document.getElementById("xp");
const xpToNextDisplay = document.getElementById("xpToNext");
const tasksList = document.getElementById("tasks");

// Random Task Storage
let randomTask = null;

// Render Daily Task
function renderDailyTask() {
    const now = new Date();
    const today = now.toDateString();

    // Check if a daily task is already stored in localStorage
    const storedTask = localStorage.getItem("dailyTask");
    const storedDate = localStorage.getItem("taskDate");

    // If the stored task is from today, load it; otherwise, pick a new task
    if (storedDate === today && storedTask) {
        randomTask = JSON.parse(storedTask);
    } else {
        randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        localStorage.setItem("dailyTask", JSON.stringify(randomTask));
        localStorage.setItem("taskDate", today);
    }

    // Display the random task
    tasksList.innerHTML = `
        <li>
            <strong>Today's Task:</strong> ${randomTask.name}
            <button onclick="completeRandomTask()">+${randomTask.xp} XP</button>
        </li>
    `;
}

// Complete Random Task
function completeRandomTask() {
    if (randomTask) {
        xp += randomTask.xp;
        updateStats();
        levelUp();
        alert(`Well done! You completed: ${randomTask.name}`);
    }
}

// Update Stats
function updateStats() {
    levelDisplay.textContent = level;
    xpDisplay.textContent = xp;
    xpToNextDisplay.textContent = xpToNext;
}

// Level Up Logic
function levelUp() {
    if (xp >= xpToNext) {
        xp -= xpToNext;
        level++;
        xpToNext = Math.floor(xpToNext * 1.5); // Increase XP required for next level
        alert(`Congratulations! You've reached Level ${level}!`);
        updateStats();
        levelUp(); // Check if another level up is possible
    }
}

// Initialize App
renderDailyTask();
updateStats();
