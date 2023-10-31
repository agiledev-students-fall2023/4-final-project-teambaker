import { useState } from 'react';

const CityList = ({ cities, searchData}) => {
  
    const filteredCities = cities.filter(city => {
        if (typeof searchData === 'string') {
          return city.toLowerCase().startsWith(searchData.toLowerCase());
        }
        return false;
      }).slice(0, 4);

  // Handle city click event
  const handleCityClick = (city) => {
    console.log("cities",city);
  };

  return (
    <div className='overflow-hidden content-center mt-5'>
      <ul>
        {filteredCities.map((city, index) => (
          <li key={index} onClick={() => handleCityClick(city)} className="text-blue-500 cursor-pointer hover:underline hover:text-navyBlue">
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
