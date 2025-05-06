const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// MySQL database configuration
const dbConfig = {
  host: "localhost", // Replace with your MySQL server host (e.g., 127.0.0.1 or cloud server)
  user: "root", // Replace with your MySQL username
  password: "Al3ex123*", // Replace with your MySQL password
  database: "my_schema", // Replace with your MySQL database name
};

// Route to fetch data
app.get("/api/data/:tableName", async (req, res) => {
  const { tableName } = req.params;

  try {
    // Validate table name to prevent SQL injection
    const validTables = [
      "Institutes",
      "Country",
      "Research_Team",
      "Project",
      "Investor",
      "Investment",
      "Institute",
      "License",
      "Model",
      "Implementation_Team",
      "Data_Collection_Team",
      "Patient",
      "Visit",
      "Hospital",
      "Data_set",
      "Application",
      "Graphic_Interface",
      "Parameter",
      "Performance",
      "Rating_Type",
      "Genomics",
    ]; // List all valid table names
    if (!validTables.includes(tableName)) {
      return res.status(400).send("Invalid table name");
    }

    // Create a connection to the MySQL database
    const connection = await mysql.createConnection(dbConfig);

    // Execute a SQL query to fetch all rows from the specified table
    const [rows] = await connection.execute(`SELECT * FROM ${tableName}`);

    // Close the connection
    await connection.end();

    // Return the fetched data
    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data from the database");
  }
});

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
