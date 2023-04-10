import './card.css'
import PropTypes from "prop-types";

interface Props {
    text: string
}

/**
 * @param {Object} props 
 * @param {string} props.text 
 * @returns {JSX.Element} 
 */

function InfoText({text}: Props) {
  return (
    <div className='card-container'>
        <p className='card-text'>{text}</p>
    </div>
  )
}

InfoText.propTypes = {
  text: PropTypes.string.isRequired,
  
}


export default InfoText;