import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicial from "../Paginas/Inicial/Inicial";
import Register from "../Paginas/Register/Register";
import Login from "../Paginas/Login/Login"
import Home from "../Paginas/Home/Home";
import Config from "../Paginas/Config/Config";
import Perfil from "../Paginas/Perfil/Perfil";
import Assinatura from "../Paginas/Assinatura/Assinatura"
import Interesses from "../Paginas/Interesses/Interesses"
import EsqueceuSenha from '../Paginas/EsqueceuSenha/EsqueceuSenha';
import RegisterCriador from '../Paginas/RegisterCriador/RegisterCriador';
import UploadVideo from '../Paginas/UploadVideo/UploadVideo'; 
import PlaylistView from '../Paginas/PlaylistView/PlaylistView';
import ErrorBoundary from './ErrorBoundary';

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Inicial />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/interesses" element={<Interesses />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/config" element={<Config />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/assinatura" element={<Assinatura />} />
                    <Route path="/EsqueceuSenha" element={<EsqueceuSenha />} />
                    <Route path="/RegisterCriador" element={<RegisterCriador />} />
                    <Route path="/upload-video" element={<UploadVideo />} />
                    <Route path="/playlist/:playlistId" element={<PlaylistView />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}

export default App;