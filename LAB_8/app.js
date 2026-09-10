const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const FILE = 'users.json';
const getUsers = () => fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : [];

app.post('/register', (req, res) => {
    const users = getUsers();
    if (users.find(u => u.username === req.body.username)) {
        return res.json({ success: false, message: 'Username already taken!' });
    }
    users.push(req.body);
    fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
    res.json({ success: true, message: 'Registered successfully!' });
});

app.post('/login', (req, res) => {
    const users = getUsers();
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'Invalid username or password!' });
    }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));