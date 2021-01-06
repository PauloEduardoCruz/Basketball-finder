import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';
import log from '../images/player.svg'
import '../styles/components/Sidebar.css'

export default function SideBar() {
    const { goBack } = useHistory()

    return (
        <aside className="app-sidebar">
            
            <img src={log} width="60" height="60" alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#000" />
                </button>
            </footer>
        </aside>
    )
}