import { useState } from 'react';

export default function OfficialLanguage() {
  const [language, setLanguage] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/numberOfcities?language=${language}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{alignItems:'center',marginTop:'2rem'}}>
      <h3>Number of cities that speak the same language</h3>
      <div style={{ marginTop: '1rem' ,alignItems:'center'}}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '9px',justifyContent: 'center' }}>
          <label>
            <span>Enter Language: </span>
            <input type="text" value={language} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {result && (
          <div>
            <h3>Cities that speak {language}: {result.NumberOfCities}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
