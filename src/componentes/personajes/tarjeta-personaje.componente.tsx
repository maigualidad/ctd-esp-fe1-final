import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { useNavigate } from 'react-router-dom';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface Props {
    id: number;
    name: string;
    image: string;
    onFavoriteclick: () => void;
    esFavorito: boolean;
}

const TarjetaPersonaje = ({ id, name, image, onFavoriteclick, esFavorito } : Props) => {

    const navigate = useNavigate();

    return (
        <div className='tarjeta-personaje'>
            <img src={image} alt={name} onClick={() => navigate(`/detalle/${id}`)}/>
            <div className='tarjeta-personaje-body'>
                <span>{name}</span>
                <BotonFavorito
                    esFavorito={esFavorito}
                    onClick={onFavoriteclick}
                />
            </div>
        </div>
    );
};

export default TarjetaPersonaje;