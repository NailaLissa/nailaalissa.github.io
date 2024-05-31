// queries on new_world database
const queries = [
  {
    query: 'SELECT Name FROM country WHERE Population > 8000000;',
    message: 'Countries with population greater than 8 million:',
  },
  {
    query: "SELECT Name FROM country WHERE Name LIKE '%land%';",
    message: 'Countries with "land" in their names:',
  },
  {
    query: 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;',
    message: 'Cities with population between 500,000 and 1 million:',
  },
  {
    query:
      "SELECT city.Name,city.Id FROM city JOIN country ON city.CountryCode = country.Code WHERE country.Continent = 'Europe' AND country.Capital = city.ID order by city.name ;",
    message: 'Capitals on the continent Europe:',
  },
  {
    query: `SELECT country.Name
            FROM country
            JOIN city ON country.Code = city.CountryCode
            GROUP BY country.Code
            HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000;`,
    message:
      'Countries with more than 10 cities and a total city population of more than 50 million:',
  },
  {
    query: `SELECT city.Name, city.Population
            FROM city
            JOIN country ON city.CountryCode = country.Code
            WHERE country.Name IN (
              SELECT country.Name
              FROM country
              JOIN city ON country.Code = city.CountryCode
              GROUP BY country.Code
              HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000
            ) AND city.Population > 5000000;`,
    message:
      'Cities with population greater than 5 million in the countries found in the previous query:',
  },
  {
    query: `SELECT country.Continent, country.Name, city.Name as Capital
            FROM country
            JOIN city ON country.Capital = city.ID
            WHERE (country.Population / country.SurfaceArea) > 1000;`,
    message: 'Countries with a population density greater than 1000 people per km²:',
  },
  {
    query: `SELECT Continent, Name as Country, SurfaceArea
            FROM country as country1
            WHERE SurfaceArea = (
            SELECT MAX(SurfaceArea)
            FROM country as country2
            WHERE country2.Continent = country1.Continent
            AND country2.Continent != 'Antarctica'
      );`,
    message: 'Largest country by size on each continent (except Antarctica):',
  },
];
module.exports = queries;
