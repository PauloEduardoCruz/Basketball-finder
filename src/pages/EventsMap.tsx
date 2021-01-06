import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import '../styles/pages/events-map.css'
import 'leaflet/dist/leaflet.css'
//import mapMarkerImg from '../images/Local.svg'
import mapMarkerImg from '../images/pin.svg'
import log from '../images/Log3.png'


import api from '../services/api'


// Marker config
/*
const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]

})

  iconSize: [150, 150],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
*/

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [70, 70],
  iconAnchor: [35, 70],
  popupAnchor: [150, -17]

})

// Type Script interface
interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}




// Início da página
function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);


  //Fazendo a requisição e pegando a lista de orfanatos
  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, []);




  return (
    <div id="page-map">

      <aside>
        <header>
        <img src={log} width="100" height="100" alt="Happy" />

          <h2>Escolha um jogo no mapa</h2>
          <p>Muitos jogadores estão esperando você.</p>
        </header>
        <footer>
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </footer>
      </aside>


      <Map
        center={[-15.8950577, -48.118437]}
        zoom={14.75}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" ></TileLayer>

        
        
        { orphanages.map(orphanage => {
          //Pra cada orfanato que veio do get ele vai fazer essa parada, que é colocar um marcador e o botão com link
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/event/${orphanage.id}`} >
                  <FiArrowRight size={20} color="FFF"></FiArrowRight>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>


      <Link to="/event/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF"></FiPlus>
      </Link>
    </div>
  )
}

export default OrphanagesMap;