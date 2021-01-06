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
interface Event {
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


interface EventParams {
  id: string;
}

export default function Event() {
  const params = useParams<EventParams>();
  
  const [event, setEvent] = useState<Event>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setEvent(response.data)
    })
  }, [params.id]);


  if (!event) {
    return <p>Carregando...</p>
  }


  return (
    <div id="page-event">
      <Sidebar></Sidebar>

      <main>
        <div className="event-details">

          {/* Imagem grande */}
          <img src={event.images[activeImageIndex].url} alt={event.name} />

          {/* Imagem Pequenas */}
          <div className="images">
            {event.images.map((image, index) =>{
              
              return (
                <button
                 key={image.id}
                 className={activeImageIndex === index ? 'active' : ''}
                 type="button"
                 onClick={() => {
                    setActiveImageIndex(index);
                 }}
                 >
                  <img src={image.url} alt={event.name}></img>
                </button>
              )
            })}
          </div>
            

          <div className="event-details-content">
            <h1>{event.name}</h1>
            <p>{event.about}</p>

            <div className="map-container">
              <Map
                center={[event.latitude, event.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" ></TileLayer>
                <Marker interactive={false} icon={happyMapIcon} position={[event.latitude, event.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Ponto de referência</h2>
            <p>{event.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Horário de início <br />
                {event.opening_hours}
              </div>

              {event.open_on_weekends ? (
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