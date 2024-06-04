import  { useState } from 'react';
import Component1 from './Capital';
import Component3 from './cities';
 import Component2 from './LanguageRegion';
import Component4 from './RelatedCountry';

function ButtonComponent() {
  const [activeButton, setActiveButton] = useState('');

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
    <div style={{display:'flex',gap:'2rem', marginBottom:'1rem'}}>
      <button onClick={() => handleClick('Button 1')} disabled={activeButton === 'Button 1'}>
      capital City
      </button>
      <button onClick={() => handleClick('Button 2')} disabled={activeButton === 'Button 2'}>
      Languages in region
      </button>
      <button onClick={() => handleClick('Button 3')} disabled={activeButton === 'Button 3'}>
    Number Of Cities 
      </button>
      <button onClick={() => handleClick('Button 4')} disabled={activeButton === 'Button 4'}>
     Countries
      </button>

    
      </div>
      <div>
        {activeButton === 'Button 1' && <Component1 />}
        {activeButton === 'Button 2' && <Component2 />}
        {activeButton === 'Button 3' && <Component3 />}
        {activeButton === 'Button 4' && <Component4 />}
      </div>
      </div>
  );
}

export default ButtonComponent;
