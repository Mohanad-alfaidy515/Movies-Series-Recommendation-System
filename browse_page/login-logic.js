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

        // Check credentials
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert('Invalid email or password');
            return;
        }

        // Set current user as logged in
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        }));

        alert(`Welcome back, ${user.name}!`);
        window.location.href = 'index.html';
    });
});