import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams } from "react-router-dom";
import { getPersonajesFilter  } from "../redux/personajeSlide";
import { useEffect } from "react";


/**
 *
 * @returns la pagina de detalle
 */



const PaginaDetalle = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  let personaje = useAppSelector((state) => state.personajes.selected);
  const favoritos = useAppSelector((state) => state.personajes.favoritos);
  const error = useAppSelector((state) => state.personajes.error);


  
  const esFavorito = favoritos.find((item) => item === personaje.id);

  const valueParams = () => {
    dispatch(getPersonajesFilter (id || ""));
  };

  useEffect(() => {
    valueParams();
  }, []);



  return (
    <>
      {error === true ? (
        <h3>Error, vuelva a intentarlo.</h3>
      ) : (
        <div className="container">
          <h3>{personaje.name}</h3>
          <div className={"detalle"}>
            <div className={"detalle-header"}>
              <img src={personaje.image} alt={personaje.name} />
              <div className={"detalle-header-texto"}>
                <p>{personaje.name}</p>
                <p>
                  Planeta:{" "}
                  {personaje.origin.name === "unknown"
                    ? "desconocido"
                    : personaje.origin.name}
                </p>
                <p>
                  Genero:{" "}
                  {personaje.gender === "unknown"
                    ? "desconocido"
                    : personaje.gender}
                </p>
              </div>
              <BotonFavorito
                esFavorito={esFavorito ? true : false}
                onClick={()=>personaje}
              />
            </div>
          </div>
          <h4>Lista de episodios donde apareció el personaje</h4>
          <div className={"episodios-grilla"}>
            {personaje.episode.map((url, index) => (
              <TarjetaEpisodio url={url.toString()} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PaginaDetalle;
