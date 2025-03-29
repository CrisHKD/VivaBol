import { Children } from 'react';
import { Link } from 'react-router-dom';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}:DefaultLayoutProps){
    return (
        <>
            <header className="header">
                {/* Logo y Nombre */}
                <div className="logo">
                    <img src="/logo.svg" alt="Logo" className="logo-img" />
                    <span className="logo-text">VIVABOL</span>
                </div>

                {/* Menú de navegación */}
                <nav className="nav">
                    <Link to="/eventos" className="nav-link">Eventos</Link>
                    <Link to="/calendario" className="nav-link">Calendario</Link>
                    <Link to="/emprendedores" className="nav-link active">Emprendedores</Link>
                    <Link to="/historia" className="nav-link">Historia y cultura</Link>
                    <Link to="/documentos" className="nav-link">Documentos</Link>
                    <Link to="/galeria" className="nav-link">Galería</Link>
                </nav>

                {/* Perfil */}
                <div className="profile">
                    <img src="/user-icon.svg" alt="Perfil" className="profile-img" />
                    <span className="profile-name">Nombre Apellido</span>
                </div>
                </header>
                <main>{children}</main>
        </>
    );
}