require('dotenv').config();

const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: bf8xbwav9dpik2zrmbd8-mysql.services.clever-cloud.com,
    user: uxng9h5dx6bwdqp2,
    password: dsX4rBaANC0ic2w3oJyR,
    database: bf8xbwav9dpik2zrmbd8
});

// Test database connection
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const sql = "INSERT INTO students (`ID`, `email`, `password`, `Last_name`, `First_name`, `Year_Level`) VALUES (?)";
    const values = [
        req.body.ID,
        req.body.email,
        req.body.password,
        req.body.lastName, // Ensure it matches Last_name
        req.body.firstName, // Ensure it matches First_name
        req.body.yearLevel // Ensure it matches Year_Level
    ];
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error");
        }
        return res.status(201).json(data);
    });
});


// Login endpoint
app.post('/api/login', (req, res) => {
    const sql = "SELECT * FROM students WHERE `email` = ? AND `password` = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error during login:', err); // Log specific error
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});

// Home route
app.get('/', (req, res) => res.send("API is working"));

// 404 route
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(8081, () => {
    console.log("listening on port 8081");
});

app.get('/api/signup', (req, res) => {
    // Logic to retrieve data
    res.json({ message: 'GET request successful' });
});

module.exports = app;