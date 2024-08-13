import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../../App';
import { BsDot } from 'react-icons/bs';
import Nav from '../Nav';
import HomeBanner from '../HomeBanner';
function PresenterDetails() {
    const { id } = useParams();
    const [info, setInfo] = useState({});
    const [book, setBook] = useState([]);
    const url = `http://localhost:5003/posts/${id}/`;
    const category = useContext(DataContext);
    const [section, setSection] = useState([]);

    let data = category.Presenter;
    const imageStyle = {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
    };
    const authorStyle = {
      textAlign: 'left',
    };
  return (
    <div>
      <Nav/>
      <HomeBanner />
      <div className='detailsHeader'>
        {data.map((item) => {
          if (item.id == id) {
            return (
              <div key={item.id}>
                
                <div className='dtailsBanner'>
                  {/* <img src={item.image} alt='' style={imageStyle} /> */}
                </div>
                <p className=' banner-content author'>
                  {item.name} <span>{item.date}</span>
                </p>
                <p className='banner-content'>{item.bio}</p>
              </div>
            );
          }
        })}
        <h1 className='detailsHeader'>
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id. */}
          {info.title}
        </h1>
        <p className='banner-content'>{info.content}</p>
        <Link to={-1}>
          <button className='btn'>Retour</button>
        </Link>
      </div>
      ;
    </div>
  );
}

export default PresenterDetails;
