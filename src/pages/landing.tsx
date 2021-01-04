import React from 'react'
import '../styles/pages/landing.css'
import logoImg from '../images/Logo.svg'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy" />

                <main>
                    <h1>Leve felividade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas criaças.</p>
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
