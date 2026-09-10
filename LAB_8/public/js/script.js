// Register logic
const form = document.getElementById('form');
if (form) {
    form.onsubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                botName: document.getElementById('botName').value
            })
        });
        const data = await res.json();
        if (data.success) {
            alert(data.message);
            window.location.href = 'login.html';
        } else {
            document.getElementById('msg').innerText = data.message;
        }
    };
}

// Login logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('msg').innerText = data.message;
        }
    };
}