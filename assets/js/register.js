let currentRole = '';
let photoFile = null;

// PHOTO PREVIEW FUNCTION
function previewPhoto(input) {
    const preview = document.getElementById('photoPreview');
    const previewImg = document.getElementById('previewImg');
    const noPhoto = document.getElementById('noPhoto');
    
    if (input.files && input.files[0]) {
        photoFile = input.files[0];
        
        // File size check (2MB max)
        if (photoFile.size > 2 * 1024 * 1024) {
            alert('❌ Photo size must be less than 2MB!');
            input.value = '';
            photoFile = null;
            previewImg.style.display = 'none';
            noPhoto.style.display = 'block';
            return;
        }
        
        // File type check
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(photoFile.type)) {
            alert('❌ Only JPG/PNG photos allowed!');
            input.value = '';
            photoFile = null;
            previewImg.style.display = 'none';
            noPhoto.style.display = 'block';
            return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            noPhoto.style.display = 'none';
        };
        reader.readAsDataURL(photoFile);
    }
}

function toggleFields() {
    const role = document.getElementById('role').value;
    const workerSellerFields = document.getElementById('workerSellerFields');
    const customerFields = document.getElementById('customerFields');
    
    if (role === 'worker' || role === 'seller') {
        workerSellerFields.style.display = 'block';
        customerFields.style.display = 'none';
        currentRole = role;
    } else if (role === 'customer') {
        workerSellerFields.style.display = 'none';
        customerFields.style.display = 'block';
        currentRole = role;
    } else {
        workerSellerFields.style.display = 'none';
        customerFields.style.display = 'none';
    }
}

function submitForm() {
    // Check photo for worker/seller
    if ((currentRole === 'worker' || currentRole === 'seller') && !photoFile) {
        alert('❌ Please upload profile photo!');
        return;
    }

    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.getElementById('terms').checked,
        photo: photoFile ? photoFile.name : null
    };

    // Role-specific fields
    if (currentRole === 'worker' || currentRole === 'seller') {
        formData.skill = document.getElementById('skill').value;
        formData.experience = document.getElementById('experience').value;
        formData.fees = document.getElementById('fees').value;
        formData.location = document.getElementById('location').value;
    } else if (currentRole === 'customer') {
        formData.address = document.getElementById('address').value;
    }

    // VALIDATION 
    if (!formData.role) {
        alert('Please select account type!');
        return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        alert('Password must be 8+ chars with 1 number, 1 letter, 1 symbol!');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (!formData.terms) {
        alert('Please accept Terms & Conditions!');
        return;
    }

    // SUCCESS - Show form data
    const btn = document.querySelector('.register-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Uploading Photo...';
    btn.disabled = true;

    setTimeout(() => {
        console.log('📤 Form Data:', formData);
        alert(`✅ ${formData.role.toUpperCase()} account created!\n\n👤 ${formData.name}\n📸 Photo: ${formData.photo || 'No photo'}\n📍 ${formData.location || formData.address}`);
        window.location.href = 'workers.html';
    }, 2500);
}

// HAMBURGER 
window.addEventListener('load', function() {
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
});
