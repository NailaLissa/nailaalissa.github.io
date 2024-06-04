import mysql from 'mysql2';
const pool = mysql
  .createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'new_world',
    multipleStatements: true,
  })
  .promise();
const result = await pool.query('select * from city;');
//console.log(result);
async function fetchData() {
  try {
    const [rows] = await pool.query('SELECT * FROM city where name = "Resistencia";');
    console.log(rows);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await pool.end();
  }
}
//fetchData();
// Function to get the capital of a country
async function getCapitalOfCountry(countryName) {
  const query = `
    SELECT city.Name AS Capital
    FROM city
    INNER JOIN country ON city.ID = country.Capital
    WHERE country.Name = ?;
  `;
  const [rows] = await pool.execute(query, [countryName]);
  return rows.length ? rows[0].Capital : 'Capital not found';
}
// Function to list all languages spoken in a region
async function listLanguagesInRegion(regionName) {
  const query = `
    SELECT DISTINCT cl.Language
    FROM countrylanguage AS cl
    INNER JOIN country AS c ON cl.CountryCode = c.Code
    WHERE c.Region = ?;
  `;
  const [rows] = await pool.execute(query, [regionName]);
  return rows.map((row) => row.Language);
}
