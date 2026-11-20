
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow the API to process JSON
app.use(express.json());

// Our original collection of facts
const facts = [
    {
        id: 1,
        category: "Science",
        fact: "A day on Venus is longer than its year."
    },
    {
        id: 2,
        category: "Space",
        fact: "Neutron stars can spin hundreds of times per second."
    },
    {
        id: 3,
        category: "Animals",
        fact: "Octopuses have three hearts."
    },
    {
        id: 4,
        category: "Science",
        fact: "Water can exist in solid, liquid, and gas forms."
    },
    {
        id: 5,
        category: "Animals",
        fact: "A group of flamingos is called a flamboyance."
    },
    {
        id: 6,
        category: "Space",
        fact: "Saturn is less dense than water on average."
    },
    {
        id: 7,
        category: "History",
        fact: "The printing press helped spread books across Europe."
    },
    {
        id: 8,
        category: "Animals",
        fact: "Butterflies taste using sensors on their feet."
    }
];

// Return an actual image
app.get("/api/images/random", (req, res) => {
    const imagePath = path.join(
        __dirname,
        "public",
        "images",
        "random-dog.png"
    );

    res.sendFile(imagePath);
});

// Welcome endpoint
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Random Facts API!",
        endpoints: [
            "/api/facts",
            "/api/facts/random",
            "/api/facts/1",
            "/api/categories"
        ]
    });
});

// Get all facts
app.get("/api/facts", (req, res) => {
    res.json({
        success: true,
        count: facts.length,
        data: facts
    });
});

// Get one random fact
app.get("/api/facts/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    const randomFact = facts[randomIndex];

    res.json({
        success: true,
        data: randomFact
    });
});

// Get a fact by ID
app.get("/api/facts/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid fact ID."
        });
    }

    const fact = facts.find(item => item.id === id);

    if (!fact) {
        return res.status(404).json({
            success: false,
            message: "Fact not found."
        });
    }

    res.json({
        success: true,
        data: fact
    });
});

// Get all available categories
app.get("/api/categories", (req, res) => {
    const categories = [...new Set(facts.map(item => item.category))];

    res.json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// Handle unknown endpoints
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found."
    });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Random Facts API running on port ${PORT}`);
});