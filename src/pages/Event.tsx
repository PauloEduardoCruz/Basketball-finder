import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import Sidebar from '../components/SideBar'
//import mapMarkerImg from '../images/map-marker.svg';
import mapMarkerImg from '../images/pin.svg'
import { useParams } from 'react-router-dom'


import '../styles/pages/event.css';
import api from "../services/api";


// Marker config
const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,


  iconSize: [70, 70],
  iconAnchor: [35, 70],
  popupAnchor: [150, -17]
})

// Type Script interface
interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: {
    id: number;
    url: string;
  }[];
}


interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id]);


  if (!orphanage) {
    return <p>Carregando...</p>
  }


  return (
    <div id="page-orphanage">
      <Sidebar></Sidebar>

      <main>
        <div className="orphanage-details">

          {/* Imagem grande */}
          
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          {/* Imagem Pequenas */}
          <div className="images">
            {orphanage.images.map((image, index) =>{
              
              return (
                <button
                 key={image.id}
                 className={activeImageIndex === index ? 'active' : ''}
                 type="button"
                 onClick={() => {
                    setActiveImageIndex(index);
                 }}
                 >
                  <img src={image.url} alt={orphanage.name}></img>
                </button>
              )
            })}
          </div>
            

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" ></TileLayer>
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Ponto de referência</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Horário de início <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Quadra com duas cestas. <br />
                  
                </div>
              ) : (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#db4e04" />
                  Quadra com uma cesta. <br />
                  </div>
                )}
            </div>



            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> 

          </div>
        </div>
      </main>
    </div>
  );
}