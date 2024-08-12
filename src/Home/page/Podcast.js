import React from 'react'
import Nav from '../Nav';

function Podcast() {
  const podcast = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'50vh',
    padding:'30px 0px',
    backgroundColor:'whitesmoke',
  }
  return (
    <div>
      <Nav />
      <div className='podcast' style={podcast}>
        <img
          src='favicon.ico'
          style={{ width: '200px', height: 'auto' }}
          alt=''
        />
      </div>
    </div>
  );
}

export default Podcast