import './filtros.css';
import PropTypes from "prop-types";

interface Props {
    inputRef: React.RefObject<HTMLInputElement>;
    searchCharacter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}


const Filtros = ({ inputRef, searchCharacter, value} : Props) => {


    return (
        <div className='filtros'>
            <label htmlFor='nombre'>Filtrar por nombre:</label>
            <input
                type='text'
                placeholder='Rick, Morty, Beth, Alien, ...etc'
                name='nombre'
                value={value}
                onChange={searchCharacter}
                autoComplete='off'
                ref={inputRef}
            />
        </div>
    );
};

Filtros.propTypes = {
    inputRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
    searchCharacter: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default Filtros;