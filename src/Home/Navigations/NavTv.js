import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import { Link, useParams } from 'react-router-dom';
import '../page/Page.css';
import { DataContext } from '../../App';
import Nav from '../Nav';

function NavTv() {
      const category = useContext(DataContext);
      const [data, setData] = useState([]);
      const [visible, setVisible] = useState(4);
      useEffect(() => {
        let feed = category.Television;
        setData(feed);
      }, []);
      const showMoreItems = () => {
        console.log('hi');
        setVisible((previousValue) => previousValue + 4);
      };
      const headerColor = {
        color: 'white',
        overFlowY: 'hidden',
        textAlign:'center'
      };
      const imageStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        objectFit:'contain'
      };
       const imageStyleBtn = {
         width: '100%',
         height: '100%',
         borderRadius: '10px',
         objectFit: 'contain',
       };
       const icon = {
         width: '50px',
         height: '50px',
         borderRadius: '10px',
         objectFit: 'contain',
       };
      const card = {
        width: '100%',
        height: '300px',
        borderRadius: '10px',
      };
      const handleClick = () =>{
        window.open(
          'https://www.youtube.com/channel/UC4aJDqk_76_QVGAaM_MbvYw',
          '_blank'
        );
      }
  return (
    <div>
      <div>
        <Nav />
        <div className='watchBanner watch'>
          <div className='homeBannerSection1 watch'>
            <a
              href='#'
              className='myLink listner watcher'
              onClick={handleClick}
            >
              <span>
                <h1 style={{ color: 'white', fontWeight: 'bold' }}>Regarder</h1>
              </span>
              <span className='liveHolder'>
                <span className='livetv'>
                  <img src='Live_tv_n.png' alt='' style={icon} />
                  <img
                    src='Red_circle.gif'
                    alt=''
                    className='circular'
                  />
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className='presenterPage-container television'>
          <div className='gridcontainer'>
            <div className='newsGrid'>
              {data.slice(0, visible).map((item) => {
                return (
                  <div>
                    {/* <div className='frameImage'></div> */}
                    {/* <Link to={`/Himma-Tv/${item.id}`} key={item.id}> */}
                    <div className='newsCardImage'>
                      <iframe
                        width='100%'
                        height='100%'
                        src='https://www.youtube.com/embed/kA_FQcXt6tc?si=O0gSafaIbVM_J0-5'
                        title='YouTube video player'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowfullscreen
                      ></iframe>
                      {/* <img src={item.image} alt='' style={imageStyle} /> */}
                    </div>
                    <div className='newsCardHeader'>
                      {/* change class name to textLimit */}
                      <h3 style={headerColor} className='textLimi'>
                        {item.title}
                      </h3>
                    </div>
                    {/* </Link> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className='moreBtn'>
            <button className='viewmore btn' onClick={showMoreItems}>
              <div style={{ width: '30px', height: '30px', color: 'black' }}>
                <img
                  src='viewMore_icon.png'
                  alt=''
                  style={imageStyleBtn}
                />
              </div>
              <span style={{ color: 'white' }}>Voir plus</span>
            </button>
          </div>
        </div>
        <div className='page-container-mobile'>
          <div className='gridcontainer'>
            <div className='newsGrid-shows'>
              {data.slice(0, visible).map((item) => {
                return (
                  <div className='tv-card-mobile'>
                    {/* <div className='frameImage'></div> */}
                    {/* <Link to={`/Himma-Tv/${item.id}`} key={item.id}> */}
                    <div className='newsCardImage_mobile' style={card}>
                      <iframe
                        width='100%'
                        height='100%'
                        src='https://www.youtube.com/embed/94Ie-7K3QS8?si=XZDINIjkYArigGTI'
                        title='YouTube video player'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowfullscreen
                      ></iframe>
                      {/* <img src={item.image} alt='' style={imageStyle} /> */}
                    </div>
                    <div className='profileInfo'>
                      <h3 style={headerColor} className='textLimi'>
                        {item.title}
                      </h3>
                    </div>
                    {/* </Link> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className='moreBtn'>
            <button className='viewmore btn' onClick={showMoreItems}>
              <span
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
              >
                <img
                  src='viewMore_icon.png'
                  alt=''
                  style={imageStyleBtn}
                />
              </span>
              <span style={{ color: 'white' }}>Voir plus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavTv;
