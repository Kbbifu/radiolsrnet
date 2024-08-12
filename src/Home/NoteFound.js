import React from 'react'
import Nav from './Nav';
import {CgDanger} from 'react-icons/cg'

function NoteFound() {
  return (
    <div>
      <Nav />
      <div className='notFound'>
        <div>
          <h1 className='warning'>
            <CgDanger size={'4rem'} style={{ color: 'read' }} />{' '}
            <span> 404 Not Found !!!</span>
          </h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  );
}

export default NoteFound