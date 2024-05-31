const mysql = require('mysql2');
const fs = require('fs');

// queries on new_world database
const queries = require('./queries.js');
// Create connection to MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  multipleStatements: true,
});

// Read SQL files
const hrData = fs.readFileSync('HR_database.sql', 'utf8');
const newWorldData = fs.readFileSync('new_world.sql', 'utf8');
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server.');
  connection.query(hrData, (err, results) => {
    if (err) {
      console.log(err.message);
    }
    console.log('HR database and tables created and populated.');
    connection.query(newWorldData, (err, results) => {
      if (err) {
        console.error('error', err.message);
      }
      console.log('new_world database imported.');
      queries.forEach((q, index) => {
        connection.query(q.query, (err, results) => {
          if (err) {
            console.error(`Error executing query ${index + 1}: ${q.query}`, err.message);
            return;
          }
          console.log(q.message);
          console.log(results);
        });
      });

      // Close the connection
      connection.end(function (err) {
        if (err) throw err;
        console.log('Connection closed.');
      });
    });
  });
});
