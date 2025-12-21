// =========================================
// HAMBURGER MENU - TOP PRIORITY
// =========================================
window.addEventListener('load', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav-links');
    
    console.log('Workers page - Hamburger setup');
    
    if (hamburger && nav) {
        hamburger.onclick = function() {
            console.log('*** WORKERS HAMBURGER CLICKED! ***');
            nav.classList.toggle('active');
        };
        
        // Close menu jab bahar click kare
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }
});

// =========================================
// WORKERS FUNCTIONALITY (FIXED)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("Workers page loaded!");
    
    const workers = [
        {
            name: "Rahul Sharma",
            skill: "Teacher",
            experience: 3,
            location: "Gurugram",
            fees: 300,
            image: "assets/images/rahul.jpg",
            phone: "+91 9310519312"
        },
        {
            name: "Anita Verma", 
            skill: "Plumber",
            experience: 5,
            location: "Rewari",
            fees: 200,
            image: "assets/images/anita.jpg",
            phone: "+91 9310519312"
        },
        {
            name: "Vikram Singh",
            skill: "Electrician",
            experience: 2,
            location: "Faridabad",
            fees: 400,
            image: "assets/images/vikram.jpg",
            phone: "+91 9310519312"
        },
        {
            name: "Priya Gupta",
            skill: "Carpenter",
            experience: 4,
            location: "Gurugram",
            fees: 350,
            image: "assets/images/default-worker.jpeg",
            phone: "+91 9310519312"
        },
        {
            name: "Amit Kumar",
            skill: "Painter",
            experience: 6,
            location: "Jhajjar",
            fees: 250,
            image: "assets/images/default-worker.jpeg",
            phone: "+91 9310519312"
        }
    ];

    const workerList = document.getElementById("worker-list");
    const filterSkill = document.getElementById("filterSkill");
    const filterExperience = document.getElementById("filterExperience");
    const filterLocation = document.getElementById("filterLocation");
    const filterFees = document.getElementById("filterFees");

    function displayWorkers(filteredWorkers) {
        workerList.innerHTML = "";

        if (filteredWorkers.length === 0) {
            workerList.innerHTML = `
                <div class="no-results">
                    <h3>😔 No workers found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            `;
            return;
        }

        filteredWorkers.forEach((worker, index) => {
            const workerCard = document.createElement("div");
            workerCard.classList.add("worker-card");
            workerCard.style.animationDelay = `${index * 0.1}s`;
            workerCard.innerHTML = `
                <img src="${worker.image}" alt="${worker.name}" 
                     onerror="this.src='https://via.placeholder.com/90x90/1f2f40/ffffff?text=👤'">
                <h3>${worker.name}</h3>
                <div class="worker-info">
                    <p><strong>👨‍💼 ${worker.skill}</strong></p>
                    <p>📅 ${worker.experience}+ Years</p>
                    <p>📍 ${worker.location}</p>
                    <p class="worker-fees">₹${worker.fees}/hr</p>
                </div>
                <a href="tel:${worker.phone}" class="hire-btn">📞 Call Now</a>
            `;
            workerList.appendChild(workerCard);
        });
    }

    function filterWorkers() {
        const skillValue = filterSkill.value;
        const experienceValue = filterExperience.value;
        const locationValue = filterLocation.value;
        const feesValue = filterFees.value;

        const filtered = workers.filter(worker => {
            const matchSkill = skillValue === "" || worker.skill === skillValue;
            const matchExperience = experienceValue === "" || worker.experience >= parseInt(experienceValue);
            const matchLocation = locationValue === "" || worker.location === locationValue;

            let matchFees = true;
            if (feesValue === "0-200") matchFees = worker.fees <= 200;
            else if (feesValue === "200-500") matchFees = worker.fees > 200 && worker.fees <= 500;
            else if (feesValue === "500+") matchFees = worker.fees > 500;

            return matchSkill && matchExperience && matchLocation && matchFees;
        });

        displayWorkers(filtered);
    }

    // Initial display with loading
    workerList.innerHTML = '<div class="loading">Loading workers...</div>';
    setTimeout(() => {
        displayWorkers(workers);
    }, 500);

    // Event listeners
    if (filterSkill) filterSkill.addEventListener("change", filterWorkers);
    if (filterExperience) filterExperience.addEventListener("change", filterWorkers);
    if (filterLocation) filterLocation.addEventListener("change", filterWorkers);
    if (filterFees) filterFees.addEventListener("change", filterWorkers);
});
