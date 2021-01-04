import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import L from 'leaflet';


import { FiPlus } from "react-icons/fi";
import Sidebar from '../components/SideBar'


import '../styles/pages/create-orphanage.css';
import mapMarkerImg from '../images/map-marker.svg'
import api from "../services/api";
import { useHistory } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);


  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handlerMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }


  function handlerSelectImages(event: ChangeEvent<HTMLInputElement>) {

    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }


  async function handlerSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');

    /*
    console.log({
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
    })
    */
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar></Sidebar>

      <main>
        <form onSubmit={handlerSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-15.8950577,-48.118437]}
              style={{ width: '100%', height: 280 }}
              zoom={16}
              onclick={handlerMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" ></TileLayer>


              { position.latitude != 0 
              ? <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} />
              : null }


              {/* <Marker interactive={false} icon={happyMapIcon} position={[-15.8950577,-48.118437]}> */}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
               id="name"
               value={name}
               onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
               id="name"
               maxLength={300}
               value={about}
               onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map(image => {
                  return (
                   <img key={image} src={image} alt={name} />
                  )
                })}


                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handlerSelectImages} type="file" id="image[]"></input>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
               id="instructions"
               value={instructions}
               onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de início</label>
              <input
               id="opening_hours"
               value={opening_hours}
               onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Quadra com duas cestas:</label>

              <div className="button-select">
                <button 
                 type="button"
                 className={open_on_weekends ? 'active' : ''}
                 onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                 type="button"
                 className={!open_on_weekends ? 'active' : ''}
                 onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>

              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

 // return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
