import { useState } from 'react';

function CountryInfo() {
  const [countryName, setCountryName] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/capital?countryName=${countryName}`).then((res) => res.json())
      .then((data) => { setResult(data)});
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(result);

  return (
    <div style={{ marginTop:'2rem'}}>
    <form onSubmit={handleSubmit} style={{display:'flex',alignItems:'center',justifyContent:'center', gap:'9px'}}>
      <label>
        <span>Enter Country Name: </span>
        <input type="text" value={countryName} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
    {result.length > 0 && (
        <div>
         
          
            {result.map((item, index) => (
              <h3 key={index}>Capital :  {item.Capital}</h3>
            ))}
        
        </div>
      )}
 
  </div>
  );
}

export default CountryInfo;
