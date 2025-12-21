// =========================================
// HAMBURGER MENU - TOP PRIORITY 
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded - Hamburger setup starting...");
    
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    
    console.log("Hamburger element:", hamburger);
    console.log("Nav links element:", navLinks);
    
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("HAMBURGER CLICKED!");
            navLinks.classList.toggle("active");
        });
        
        // Close menu 
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    } else {
        console.error("Hamburger or nav not found!");
    }
});

// =========================================
// (stats, chat, etc)
// =========================================
console.log("SkillFinder Pro Loaded Successfully!");

// Stats Animation 
const stats = document.querySelectorAll('.stat h3');
let statsStarted = false;

function startCounter() {
    if (statsStarted) return;
    stats.forEach(stat => {
        let target = parseInt(stat.innerText.replace("+", ""));
        let count = 0;
        let interval = setInterval(() => {
            count += Math.ceil(target / 80);
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            stat.innerText = count + "+";
        }, 30);
    });
    statsStarted = true;
}

window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".stats");
    if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        startCounter();
    }
});

// Chat Widget 
const messenger = document.getElementById('messenger-widget');
const toggleBtn = document.getElementById('messenger-toggle');
const closeBtn = document.getElementById('messenger-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const messengerMessages = document.getElementById('messenger-messages');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (messenger) messenger.style.display = 'flex';
    });
}

if (closeBtn && messenger) {
    closeBtn.addEventListener('click', () => {
        messenger.style.display = 'none';
    });
}

function sendMessage() {
    if (!chatInput || !messengerMessages) return;
    const msg = chatInput.value.trim();
    if (msg === '') return;

    const userMsg = document.createElement('div');
    userMsg.classList.add('message', 'user');
    userMsg.textContent = msg;
    messengerMessages.appendChild(userMsg);

    chatInput.value = '';
    messengerMessages.scrollTop = messengerMessages.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.classList.add('message', 'bot');
        botMsg.textContent = "Thanks! Our support team will contact you soon.";
        messengerMessages.appendChild(botMsg);
        messengerMessages.scrollTop = messengerMessages.scrollHeight;
    }, 800);
}

if (chatSend) chatSend.addEventListener('click', sendMessage);
if (chatInput) {
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });
}


