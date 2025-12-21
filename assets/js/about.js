// ABOUT PAGE JS - HAMBURGER ONLY
window.addEventListener('load', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav-links');
    
    if (hamburger && nav) {
        hamburger.onclick = function() {
            console.log('About hamburger clicked!');
            nav.classList.toggle('active');
        };
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }
});
