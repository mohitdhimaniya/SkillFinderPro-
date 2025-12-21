// CONTACT PAGE JS
window.addEventListener('load', function() {
    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav-links');
    
    if (hamburger && nav) {
        hamburger.onclick = function() {
            nav.classList.toggle('active');
        };
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }
    
    // CONTACT FORM
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                formMessage.textContent = '✅ Thank you! Your message has been sent. We will contact you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});
