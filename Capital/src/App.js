import React, { useState, useEffect } from 'react';

function CountryCapitalGame({ data }) {
  const [countries, setCountries] = useState(Object.keys(data));
  const [capitals, setCapitals] = useState(Object.values(data));
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCapital, setSelectedCapital] = useState(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  useEffect(() => {
    setCountries(Object.keys(data));
    setCapitals(Object.values(data));
  }, [data]);

  const handleClick = (index) => {
    if (!selectedCountry) {
      setSelectedCountry(countries[index]);
    } else if (!selectedCapital) {
      setSelectedCapital(capitals[index]);
      if (capitals[index] === data[selectedCountry]) {
        setCountries(countries.filter((country) => country !== selectedCountry));
        setCapitals(capitals.filter((capital) => capital !== data[selectedCountry]));
        setSelectedCountry(null);
        setSelectedCapital(null);
      } else {
        document.getElementById(`capital-${index}`).style.backgroundColor = '#ff0000';
        setSelectedCapital(null);
      }
    }
  };

  return (
    <div>
      <div >
       
        {countries.map((country, index) => (
          <button
            key={index}
            style={{
              backgroundColor:
                selectedButtonIndex === index
                  ? capitals[index] === data[selectedCountry]
                    ? '#00ff00'
                    : '#ff0000'
                  : selectedCountry === country
                  ? '#0000ff'
                  : 'transparent',
            }}
            disabled={selectedCountry === country || selectedCapital !== null}
            onClick={() => handleClick(index)}
          >
            {country}
          </button>
        ))}
      </div>
      <div >
       
        {capitals.map((capital, index) => (
          <button
            key={index}
            id={`capital-${index}`}
            style={{
              backgroundColor:
                selectedButtonIndex === index
                  ? capitals[index] === data[selectedCountry]
                    ? '#00ff00'
                    : '#ff0000'
                  : selectedCountry === capital
                  ? '#0000ff'
                  : 'transparent',
            }}
            disabled={selectedCapital === capital || selectedCountry === null}
            onClick={() => handleClick(index)}
          >
            {capital}
          </button>
        ))}
      </div>
      {countries.length === 0 && <h2>Congratulations!</h2>}
    </div>
  );
}

export default function App() {

  const data = {
    Germany: 'Berlin',
    Azerbaijan: 'Baku',
    France: 'Paris',
    Italy: 'Rome',
  };

  return (
    <div>
      <div>Your game component</div>;
      <CountryCapitalGame data={data} />
    </div>
  );
}
