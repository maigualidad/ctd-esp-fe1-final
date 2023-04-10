import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import {Personaje} from '../../types/character.types'

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface Props {
    personajes: Personaje[];
    onFavoriteClick: (id:number) => void;
    favoritos: number[];
}


const GrillaPersonajes = ({ personajes, onFavoriteClick, favoritos } : Props) => {

    return (
        <div className='grilla-personajes'>
            {personajes && 
                personajes.map((personaje) => (
                <TarjetaPersonaje
                    key={personaje.id}
                    name={personaje.name}
                    image={personaje.image}
                    id={personaje.id}
                    onFavoriteclick={() => onFavoriteClick(personaje.id)}
                    esFavorito={favoritos.some(
                        (favorito) => favorito === personaje.id
                    )}
                />
            ))
            }
        </div>
    );
};

 
export default GrillaPersonajes;