import React, {useState, useContext, useEffect} from 'react'
import { DataContext } from '../App';
import { Link } from 'react-router-dom';
import HomeBanner from './HomeBanner';

function Presenters() {


  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0, auto',
    backgroundColor:'whitesmoke',
  }
  const category = useContext(DataContext);
  const [presenter, setPresenter] = useState([]);

  useEffect((()=>{
    setPresenter(category.Presenter)
  }),[])
      const imageStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
      };
      const imageStylemobile = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        objectFit: 'cover',
      };

  return (
    <div>
      {/* presenters section  */}
      
      <div className='presenterContainer'>
        <div className='presenterHeader mb-header'>
          <h1 className='headersFont'>Nos Animateurs</h1>
        </div>
        <div className='presenterProfileHolder'>
          <div className='presenterProfiles'>
            {presenter.map((item) => {
              return (
                <div className='presenterCard' key={item.id}>
                  <div className='sliderCardImg'>
                    <img src={item.image} style={imageStylemobile} alt='' />
                  </div>
                  <li className=''>
                    <h3>{item.name}</h3>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div style={containerStyles}>
            <Slider slides={slides} />
          </div> */}
      </div>
    </div>
  );
}

export default Presenters