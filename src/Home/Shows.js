import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../App';

function Shows() {
  const category = useContext(DataContext);
  const [shows, setShows] = useState([]);


  useEffect(() => {
    setShows(category.Shows);
  }, []);

    const imageStyle = {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      objectFit:'cover'
    };
    const imageStylemobile = {
      width: '200px',
      height: '200px',
      borderRadius: '10px',
      objectFit:'cover'
    };
  return (
    <div>
      {/* Shows section  */}

      <div className='showsContainer'>
        <div className='showHeader'>
          <h1 className='headersFont'>Nos Emissions</h1>
        </div>
        <div className='showsSlider'>
          <div className='sliderCards'>
            {shows.map((item) => {
              return (
                <div className='sliderCard' key={item.id}>
                  <div className='sliderCardImg'>
                    <img src={item.image} style={imageStyle} alt='' />
                  </div>
                  <li className='texts textLimit'>
                    <h3>
                      {item.title} <br /> {item.time}
                    </h3>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='showsContainer-mobile'>
        <div className='showHeader'>
          <h1 className='headersFont'>Nos Emissions</h1>
        </div>
        <div className='showsSlider'>
          <div className='sliderCards'>
            {shows.map((item) => {
              return (
                <div className='sliderCard' key={item.id}>
                  <div className='sliderCardImg'>
                    <img src={item.image} style={imageStylemobile} alt='' />
                  </div>
                  <li className='texts textLimit'>
                    <h3>
                      {item.title} <br /> {item.time}
                    </h3>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shows;
