import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useEffect, useRef, useState } from 'react';
import { actionBusqueda, getFilterPesonajes, getPesonajes, limpiarBusqueda, updateFavoritos } from '../redux/personajeSlide';
import InfoText from '../componentes/infoText/infoText';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {
    const [page, setPage] = useState<number>(1);
    const dispatch = useAppDispatch();
    const busqueda = useAppSelector((state) => state.personajes.inputValue);
    const [search, setSearch] = useState<string>(busqueda);
    const totalPages = useAppSelector((state) => state.personajes.metaData.pages);
    const { personajes, error, favoritos, loading } = useAppSelector((state) => state.personajes);
    const inputRef = useRef<HTMLInputElement>(null);
    const {onFavoriteClick} = useFavorite();

    useEffect(() => {
        const t = setTimeout(() => {
            dispatch(actionBusqueda(search));
            dispatch(getFilterPesonajes(search));
            
        }, 500);

        return () => {
            clearTimeout(t)
        }
    }, [search, dispatch]);

    useEffect(() => {
        dispatch(getPesonajes(page));
        inputRef?.current?.focus();
    }, [page, dispatch]);

    const previousPage = () => {
        setPage((page) => page - 1);
    };
    const nextPage = () => {
        setPage((page) => page + 1);
    };

    const resetSearch = () => {
        setSearch('');
        dispatch(limpiarBusqueda());
        inputRef?.current?.focus();
        dispatch(getPesonajes(1));
    };

    return (
        <div className='container'>
            <div className='actions'>
                <h3>Catálogo de Personajes</h3>
                <button className='primary' onClick={resetSearch} disabled={!search}>
                    Reset
                </button>
            </div>
            <Filtros
                inputRef={inputRef}
                searchCharacter={(e) => setSearch(e.target.value)}
                value={search}
            />
            {error &&  (
                <InfoText text='No encontramos el personaje buscado' />
                
            ) }
            {loading && (
                <InfoText text='cargando ...' />
            )}
            {!error && !loading && (
                <>
                    <Paginacion
                        onPreviousclick={previousPage}
                        onNextClick={nextPage}
                        disableNext={page === totalPages}
                        disablePrev={page === 1}
                    />
                    <GrillaPersonajes personajes={personajes} onFavoriteClick={onFavoriteClick} favoritos={favoritos} />
                    <Paginacion
                        onPreviousclick={previousPage}
                        onNextClick={nextPage}
                        disableNext={page === totalPages}
                        disablePrev={page === 1}
                    />
                </>
            )}
        </div>
    );
};

export default PaginaInicio;



const useFavorite = ()=> {
    const dispatch = useAppDispatch();
    const favoritos = useAppSelector((state) => state.personajes.favoritos)

    const onFavoriteClick = (id: number) => {
        const idExist = favoritos.some((favorito) => favorito === id);
        if (idExist) {
            const updateId = favoritos.filter((favorito) => favorito !== id);
            dispatch(updateFavoritos(updateId));
        } else {
            dispatch(updateFavoritos([...favoritos, id]));
        }
    };
    
    const  checkFavorites = (id : number) => favoritos.some((favorito) => favorito === id)


    return { onFavoriteClick, checkFavorites }


}