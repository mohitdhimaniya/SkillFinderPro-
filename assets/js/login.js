// LOGIN PAGE JS
window.addEventListener('load', function() {
    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav-links');
    if (hamburger && nav) {
        hamburger.onclick = function() { nav.classList.toggle('active'); };
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }

    // LOGIN TYPE TOGGLE
    const loginTypes = document.querySelectorAll('.login-type');
    loginTypes.forEach(type => {
        type.addEventListener('click', function() {
            loginTypes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });

    // LOGIN FORM
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = document.getElementById('loginPhone').value;
            const password = document.getElementById('loginPassword').value;
            const userType = document.querySelector('input[name="userType"]:checked').value;
            
            // Simple validation
            if (!phone || !password) {
                showLoginMessage('Please fill all fields!', 'error');
                return;
            }
            
            if (phone.length < 10) {
                showLoginMessage('Please enter valid phone number!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showLoginMessage('Password must be at least 6 characters!', 'error');
                return;
            }
            
            // Demo credentials
            const demoAccounts = {
                customer: { phone: '9310519312', password: '123456' },
                worker: { phone: '9310519313', password: 'worker123' },
                seller: { phone: '9310519314', password: 'seller123' }
            };
            
            const account = demoAccounts[userType];
            if (phone === account.phone && password === account.password) {
                const btn = loginForm.querySelector('.login-btn');
                btn.textContent = 'Logging in...';
                btn.disabled = true;
                
                setTimeout(() => {
                    showLoginMessage(`✅ Welcome back! Redirecting to ${userType} dashboard...`, 'success');
                    setTimeout(() => {
                        if (userType === 'customer') {
                            window.location.href = 'workers.html';
                        } else {
                            window.location.href = 'dashboard.html'; // Create later
                        }
                    }, 1500);
                }, 1000);
            } else {
                showLoginMessage('❌ Invalid phone or password!', 'error');
            }
        });
    }
    
    function showLoginMessage(text, type) {
        loginMessage.textContent = text;
        loginMessage.className = `login-message ${type}`;
        loginMessage.style.display = 'block';
        
        const btn = loginForm.querySelector('.login-btn');
        btn.textContent = 'Login Securely';
        btn.disabled = false;
    }
});
