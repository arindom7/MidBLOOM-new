const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// API endpoint to serve crop prices
app.get("/prices", (req, res) => {
    fs.readFile("prices.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error reading prices" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));