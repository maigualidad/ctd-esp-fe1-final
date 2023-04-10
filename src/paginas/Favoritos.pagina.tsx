import { useEffect, useState } from 'react';
import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { limpiarFavoritos, updateFavoritos } from '../redux/personajeSlide';
import { Personaje } from '../types/character.types';
import Card from '../componentes/infoText/infoText';

const PaginaFavoritos = () => {
    const favoritos = useAppSelector((state) => state.personajes.favoritos);
    const [listFavoritos, setListFavoritos] = useState<Personaje[]>([]);
    const dispatch = useAppDispatch();
    const {onFavoriteClick} = useFavorite();

    useEffect(() => {
        if (favoritos.length > 0) {
            fetch(`https://rickandmortyapi.com/api/character/${favoritos}`)
                .then((res) => res.json())
                .then((result) => {
                    if (Array.isArray(result)) {
                        setListFavoritos(result);
                    } else {
                        setListFavoritos([result]);
                    }
                });
        }
    }, [favoritos]);

    const clearFavorites = (): void => {
        dispatch(limpiarFavoritos())
    };

    return (
        <div className='container'>
            <div className='actions'>
                <h3>Personajes Favoritos</h3>
                <button className={!!favoritos.length ? 'danger' : 'primary'} onClick={clearFavorites} disabled={favoritos.length <= 0}>
                    Reset
                </button>
            </div>
            {favoritos.length > 0 ? (
                <GrillaPersonajes favoritos={favoritos} personajes={listFavoritos} onFavoriteClick={onFavoriteClick} />
            ) : (
                <Card text='Selecciona personas favoritos' />
            )}
        </div>
    );
};

export default PaginaFavoritos;



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