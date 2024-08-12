import React, {useState,  useEffect} from 'react'
import Nav from '../Nav'
export default function About() {
  const bg ={
    background:'white',
    color:'black',
  }
  const [data, setData] = useState('');
  const handleClick = () =>{
    window.open('https://www.sarmanfarms.com/services/', '_blank');
  }
  const imgStyle = {
    width:'100%',
    height:'100%',
    objectFit:'cover',
  }
  useEffect(()=>{
    setData(`HIMMA Radio and Television by Sarman Integrated Farms Limited is dedicated to further extension and propagation of agricultural practices within its locality.

Whether you are a farmer, researcher, or simply passionate about agriculture, our human-touch radio service will keep you informed, inspired, and connected to the pulse of the agricultural community.


 `);
  },[])
  return (
    <div>
      <Nav />
      <div className='about-container' style={bg}>
        <h1 className='headersFont'>Qui sommes-nous?</h1>
        <p className='about-content'>
          <div className="govt">
            <div className="govtholder">
            <div className="govtImg"><img src="/govt.jpeg" alt="" /></div>
            <div className="govtChair"></div>
            </div>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          Living Stone Radio est une plateforme de diffusion diversifiée avec des participations dans la radio, la télévision, entre autres.

            . <br />
            <br />
            Elle est composée de LSR FM et LSR TV avec les chaînes en direct suivantes :

            live channels: <br />
            <br />
            <li>Informations</li>
            <li>Actualités</li>
            <li>Jeunesses & Sports</li>
            <li>Divertissements</li>
            <li>Agriculture & Commerce</li> <br />
            <br />
            <h1 className='headersFont'>Notre Vision</h1>
            Notre vision est de servir notre communauté avec les informations les plus crédibles et les plus fiables pour la croissance et le développement. <br />
            <h1 className='headersFont'>Notre Mission</h1>
            Notre mission est d’utiliser la radiodiffusion comme un outil d’unité, de paix, de croissance et de développement. <br />
            <h1 className='headersFont'>Nos valeurs fondamentales</h1>
            <ul>
              <li>Respect et valorisation des savoirs et innovations locales</li>
              <li>Valeur pour l'environnement et les écosystèmes</li>
              <li>Professionnel, efficace et informé par des données scientifiques pertinentes</li>
              <li>Créatif, flexible et innovant</li>
              <li>Sensible au genre</li>
              <li>Qualité, égalité et éthique</li>
              <li>Passion. </li>
            </ul>
          </p>
        </p>
        <div>
          <button
            style={{
              border: 'none',
              background: 'inherit',
              color: 'black',
            }}
          >
            <a
              href='#'
              onClick={handleClick}
              style={{
                border: 'none',
                textDecoration: 'none',
                color: 'black',
                fontSize: '14px',
              }}
            >
              Lire plus
            </a>
          </button>
        </div>

        {/* <div className='photogallary'>
          <div className='photoGrid'>
            <div className='photo'>
              <div className='photoImage'>
                <img src='Sarman-farms-1.png' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='Chicken-layers.jpg' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='veg2.png' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='fruits1.png' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='slider121.png' style={imgStyle} alt='' />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
