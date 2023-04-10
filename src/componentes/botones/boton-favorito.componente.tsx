import './boton-favorito.css';
import PropTypes from 'prop-types';
/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @param {function} props.onClick
 * @param {Object} props 
 * @param {boolean} props.esFavorito
 */

interface Props {
    esFavorito: boolean;
    onClick: () => void;
}

const BotonFavorito = ({ esFavorito, onClick } : Props) => {
    const src = esFavorito ? '/imagenes/star-filled.png' : '/imagenes/star.png';

    
    return (
        <div className='boton-favorito' onClick={onClick}>
            <img src={src} alt={'favorito'} />
        </div>
    );
};


export default BotonFavorito;


BotonFavorito.propTypes = {
    esFavorito: PropTypes.bool.isRequired,
    onClick: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
      species:PropTypes.string,
      type:PropTypes.string,
      gender:PropTypes.string,
      origin:PropTypes.object,
      location:PropTypes.object,
      image:PropTypes.string,
      episode:PropTypes.arrayOf(PropTypes.string)
  })
  
  }