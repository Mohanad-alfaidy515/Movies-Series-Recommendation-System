// ============================================
// LOGIN LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Call Backend API
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.detail || 'Login failed') });
            }
            return response.json();
        })
        .then(data => {
            // Store JWT token
            localStorage.setItem('token', data.access_token);

            // Fetch user info
            return fetch('http://localhost:8000/auth/me', {
                headers: {
                    'Authorization': `Bearer ${data.access_token}`
                }
            });
        })
        .then(response => response.json())
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert(`Welcome back, ${user.name}!`);
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
});