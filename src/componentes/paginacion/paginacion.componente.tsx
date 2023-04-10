import './paginacion.css';
import PropTypes from "prop-types";


interface Props {
    onPreviousclick: () => void;
    onNextClick: () => void;
    disableNext: boolean;
    disablePrev: boolean;
}

/**
 * @returns {JSX.Element} 
 */

const Paginacion = ({onPreviousclick,onNextClick,disableNext,disablePrev,}: Props) => {
    return (
        <div className='paginacion'>
            <button
                disabled={disablePrev}
                className={'primary'}
                onClick={onPreviousclick}
            >
                Anterior
            </button>
            <button
                disabled={disableNext}
                className={'primary'}
                onClick={onNextClick}
            >
                Siguiente
            </button>
        </div>
    );
};

Paginacion.propType = {
    onPreviousclick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    disableNext: PropTypes.bool.isRequired,
    disablePrev: PropTypes.bool.isRequired
}


export default Paginacion;
