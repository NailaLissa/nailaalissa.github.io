import { useState } from 'react';

export default function RelatedCountries() {
  const [country, setCountry] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false); 
  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/relatedCountries?country=${country}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
    }
  };
  //console.log(result);
  
  return (
    <div style={{marginTop:'2rem'}}>
      <h3>Find Related Countries</h3>
      <div style={{ marginTop: '1rem', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '9px',justifyContent:'center' }}>
          <label>
            <span>Enter Country Name: </span>
            <input type="text" value={country} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
     
        {error && !result && <p style={{ textAlign: 'center', margin: '3rem', fontSize: '1.3rem', color: 'red' }}>There is an error in the database... {error?.message}</p>}

{result !== null && ( // Check if result is not null
  result.length > 0 ? (
    <ul>
      <h3>Countries with same official language {result.length}:</h3>
      {result.map((item, index) => (
        <li key={index} style={{ listStyle: 'none' }}>
          {item.Name}
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no countries that share the same official language and continent as {country}</p>
  )
)}
      </div>
    </div>
  );
}
