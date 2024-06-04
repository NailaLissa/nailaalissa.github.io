import { useState } from 'react';


export default function NumberOfCities() {
  const [regionName, setRegionName] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(false); 
  const handleInputChange = (e) => {
    setRegionName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/languages?regionName=${regionName}`).then((res) => res.json())
      .then((data) => { setResult(data)});
      setError(false);
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
    }
  };
  //console.log(result);
  return (
    <div style={{marginTop:'2rem'}}>
      <h3>Languages in Region</h3>
      <div style={{ marginTop: '1rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '9px' ,justifyContent:'center'}}>
          <label>
            <span>Enter Region Name: </span>
            <input type="text" value={regionName} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {error && !result && <p style={{ textAlign: 'center', margin: '3rem', fontSize: '1.3rem', color: 'red' }}>There is an error in the database... {error?.message}</p>}

        {result !== null && result.length === 0 && ( 
            <p>No languages found for region: {regionName}</p>
        )}
        {result.length > 0 && (
          <div>
            <h3>Languages in Region {regionName} : {result.length}</h3>
            <ul >
              {result.map((item, index) => (
                <li key={index} style={{listStyle:'none'}}>
                  {item.Language}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}