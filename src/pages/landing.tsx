import React from 'react'
import '../styles/pages/landing.css'
import logoImg from '../images/Logo.svg'
import log from '../images/Log3.png'
import { FiArrowRight } from 'react-icons/fi'

import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">

                <img src={log} width="250" height="250" alt="Happy" />
                



                <main>
                    <h1>Encontre novos lugares para jogar</h1>
                    <p>Nunca foi tão fácil econtrar jogos perto de você.</p>

                </main>

                <div className="location">
                    <strong>Brasília</strong>
                    <span>Distrito Federal</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" ></FiArrowRight>
                </Link>


            </div>
        </div>
    )
}

export default Landing;
