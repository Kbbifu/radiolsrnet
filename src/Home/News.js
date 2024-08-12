import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../App';



function News() {
 const category = useContext(DataContext);
 const [news, setNews] = useState([]);
 const [visible, setVisible] = useState(4);
  const url = 'http://localhost:5003/posts';
  const fakeurl = 'https://jsonplaceholder.typicode.com/posts';
  const [section, setSection] = useState([])
 useEffect( () => {
  setSection(category.News)
  // fetch(fakeurl)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(news);
  //     setNews(data);
  //   });
 }, []);

 const showMoreItems = () =>{
  
  setVisible((previousValue) => previousValue + 4);
 }
 const headerColor = {
  color:'black',
  overFlowY:'hidden'
 }
 const imageStyle = {
  width:'100%',
  height:'100%',
  borderRadius:'10px',
  objectFit:'cover'
 }
 const imageStyleBtn = {
  width:'100%',
  height:'100%',
  borderRadius:'10px',
  objectFit:'contain'
 }
       const card = {
         width: 'auto',
         height: '300px',
         borderRadius: '10px',
       };
  const linkStyle = {
    textDecoration: 'none'
  }


  return (
    <div>
      {/* NEWS SECTIONS  */}

      <div className='gencontainer'>
        <div className='newsHeader'>
          <div className='newsLogo'>
            <h1 className='Sansita headersFont'>Toutes l'actualités</h1>
          </div>
        </div>
        <div className='gridcontainer'>
          <div className='newsGrid'>
            {/* {booker.map((book)=>{
          return (
          );
          })} */}
            {section.slice(0, visible).map((sec) => (
              <div>
                <Link to={`/news/${sec.id}`} key={sec.id} className='newLink'>
                <div className='newsCard'>
                  <div className='newsCardImage'>
                    <img src={sec.image} alt='' style={imageStyle} />
                  </div>
                  <div className='newCardDetails'>
                    {/* <p>{sec.content} </p> */}
                  </div>
                  <div className='newsCardHeader'>
                    <h3 style={headerColor} className='textLimit'>
                      {sec.title}
                    </h3>
                  </div>
                </div>
                </Link>
              </div>

              // <Link to={`/full/${data._id}/`} className='webNav'>
              //   <div className='newsCard'>
              //     <div className='newsCardImage'>
              //       <iframe
              //         width='100%'
              //         height='100%'
              //         src='https://www.youtube.com/embed/k0AFkXxoqjg'
              //         title='YouTube video player'
              //         frameborder='0'
              //         allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              //         allowfullscreen
              //       ></iframe>
              //       <img src={data.post_image} alt='' style={imageStyle} />
              //     </div>
              //     <div className='newsCardHeader'>
              //       <h3 style={headerColor}>{data.title}</h3>
              //     </div>
              //     <div className='newCardDetails'>
              //       <p>{data.content} </p>
              //     </div>
              //   </div>
              // </Link>
            ))}
          </div>
        </div>
        <div className='moreBtn'>
          <button className='viewmore btn' onClick={showMoreItems}>
            <span
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
            >
              <img src='viewMore_icon.png' alt='' style={imageStyleBtn} />
            </span>
            <span className='btnName'>Plus d'actualités</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default News