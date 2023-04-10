import './tarjeta-episodio.css';
import { useEffect, useState } from "react";
import { Episode } from '../../types/character.types';
/**
 * @param {Object} props
 * @param {string} name
 * @param {string} air_date
 * @param {string} episode
 * @param {array.<string>} characters
 * @param {string} url
 * @returns {JSX.Element}
 */


interface Props {
    url: string;
  }
  
  const inicialState: Episode = {
    id: 0,
    name: "",
    air_date: "",
    episode: "",
    characters: [],
    url: "",
    created: "",
  };
  
  const TarjetaEpisodio = ({ url }: Props) => {
    const [episodio, setEpisodio] = useState(inicialState);
  
    const getEpisodios = async (url: string) => {
      const response = await fetch(url);
      const data = await response.json();
      setEpisodio(data);
      return data;
    };
  
    useEffect(() => {
      getEpisodios(url);
    }, []);
  
    return (
      <div className="tarjeta-episodio">
        <h4>{episodio.name}</h4>
        <div>
          <span>{episodio.episode}</span>
          <span>Lanzado el: {episodio.air_date}</span>
        </div>
      </div>
    );
  };


export default TarjetaEpisodio;