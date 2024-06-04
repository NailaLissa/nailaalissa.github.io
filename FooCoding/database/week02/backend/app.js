import express from 'express';
import cors from 'cors';
import {
  getCapitalOfCountry,
  listLanguagesInRegion,
  numberOfcities,
  getCountriesWithSameLanguage,
} from './database.js';
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/capital', async (req, res) => {
  const { countryName } = req.query;
  //console.log(req.query);
  if (!countryName) {
    res.status(404).json({ error: 'Counrty name is missing' });
    return;
  }
  try {
    const capital = await getCapitalOfCountry(countryName);
    //console.log(capital);
    res.status(200).json(capital);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/languages', async (req, res) => {
  const { regionName } = req.query;
  if (!regionName) {
    res.status(404).json({ error: 'region name is missing' });
    return;
  }
  try {
    const languages = await listLanguagesInRegion(regionName);
    res.status(200).json(languages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/numberOfcities', async (req, res) => {
  const { language } = req.query;
  if (!language) {
    res.status(404).json({ error: 'Language is missing' });
    return;
  }
  try {
    const numberCities = await numberOfcities(language);
    if (numberCities.length > 0) {
      res.status(200).json(numberCities[0]);
    } else {
      res.status(200).json({ NumberOfCities: 0 });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/relatedCountries', async (req, res) => {
  const { country } = req.query;

  if (!country) {
    res.status(404).json({ error: 'Country name is missing' });
    return;
  }
  try {
    const sameLanguageCountries = await getCountriesWithSameLanguage(country);
    res.status(200).json(sameLanguageCountries);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke ');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
