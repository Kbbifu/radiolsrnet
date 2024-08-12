import React, { useState, useEffect, useContext } from 'react';
import '../page/Page.css';
import { DataContext } from '../../App';
import Nav from '../Nav';

function NavShows() {
  const category = useContext(DataContext);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(4);
    useEffect(() => {
      let feed = category.Shows;
      setData(feed);
    }, []);
    const showMoreItems = () => {
      setVisible((previousValue) => previousValue + 4);
    };
    const headerColor = {
      color: 'white',
      overFlowY: 'hidden',
    };
    const imageStyle = {
      width: '100%',
      height: '200px',
      borderRadius: '10px',
      objectFit:'cover'
    };
    const imageStylemobile = {
      width: '100%',
      height:'200px',
      borderRadius: '10px',
      objectFit:'cover',
      marginBottom:'10px'
    };
        const spacer = {
          paddingBottom: '40px',
        };
  return (
    <div style={spacer}>
      <Nav />
      <div className='presenterPage-container'>
        <h1 className='Presenter-header headersFont'>Programmes</h1>
        <div className='presenterProfile'>
          {data.map((items) => {
            return (
              <div className='Profile'>
                <div className='p-image'>
                  <div className='profileImage profilestyle'>
                    <img
                      src={items.image}
                      className='profileImage profilestyle'
                      alt=''
                    />
                  </div>
                </div>
                <div className='profileInfo'>
                  <h3>{items.title}</h3>
                  <span>{items.time}</span> <span>{items.day}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='page-container-mobile'>
        <h1 className='headersFont'>Emissions</h1>
        <div className='gridcontainer'>
          <div className='newsGrid-shows'>
            {data.slice(0, visible).map((item) => {
              return (
                <div className='card_mobile_shows'>
                  <div className='newsCardImage_mobile'>
                    <img src={item.image} alt='' style={imageStylemobile} />
                  </div>
                  <div className='profileInfoMobile'>
                    <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                    <span>{item.time}</span> <span>{item.day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='NewmoreBtn'>
          <button className='viewmore' onClick={showMoreItems}>
            <span style={{ marginRight: '10px' }}>
              <img src='viewMore_icon.png' alt='' className='btnicon' />
            </span>
            <span style={{ color: 'white' }}>Voir plus</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavShows;
