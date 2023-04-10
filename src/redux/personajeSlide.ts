import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Info, Personaje } from "../types/character.types";

const apiUrl = "https://rickandmortyapi.com/api/";

interface initialType {
    inputValue: string;
    metaData: Info;
    personajes: Personaje[];
    selected: Personaje,
    favoritos: number[];
    loading: boolean;
    error: boolean;
} 


export const getPesonajes = createAsyncThunk(
    'personaje',
    async (page: number) => {
        const res = await fetch(`${apiUrl}/character/?page=${page}`)
        if(res.ok) {
            return await res.json()
        }else {
            throw new Error('La pagina no existe')
        }
    }
)

export const getFilterPesonajes = createAsyncThunk(
    'personajes',
    async (name: string) => {
        const res = await fetch(`${apiUrl}/character/?name=${name}`)
        if(res.ok){
            return await res.json()
        }else {
            throw new Error('No se encontro el personaje deseado')
        }
    }
)

export const personajesFilter = createAsyncThunk(
    "getPersonajesFilter",
    async (id: string) => {
      const response = await fetch(`${apiUrl}character/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        throw new Error("Error, no se encontro al personaje deseado");
      }
    }
  );

export const getPages = createAsyncThunk(
    "getPages", 
    async (url: string) => {
      const response = await fetch(`${url}`);
      const data = await response.json();
      return data;
  });


export const getPersonajesFilter = createAsyncThunk(
    "getPersonajesFilter",
    async (id: string) => {
      const response = await fetch(`${apiUrl}/character/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        throw new Error("Error, no se encontro al personaje deseado");
      }
    }
  );

const initialState: initialType = {
    inputValue: "",
    metaData: {count: 0, pages: 1, next: "", prev: ""},
    personajes: [],
    selected: {
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        origin: {
          name: "",
          url: "",
        },
        location: {
          name: "",
          url: "",
        },
        image: "",
        episode: [],
        url: '',
        created: ''
      },
    favoritos: [],
    loading: false,
    error: false,
}

const personajesSlice = createSlice({
    name: 'personajes',
    initialState,
    reducers: {
      actionBusqueda: (state, action) => {
            state.inputValue = action.payload
        },
        updateFavoritos: (state, action) => {
            state.favoritos = action.payload
        },
        limpiarBusqueda: (state) => {
            state.inputValue= ""
        },
        limpiarFavoritos: (state) => {
            state.favoritos= []
        },
        seleccionado: (state, action) => {
            state.selected = action.payload
          }
    },
    extraReducers: (builder) => {
        builder.addCase(getPesonajes.pending, (state) => {
                state.loading = true
                state.error = false
                state.personajes = []
            })
            .addCase(getPesonajes.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.personajes= action.payload.results
                state.metaData= action.payload.info
            })
            .addCase(getPesonajes.rejected, (state) => {
                state.loading = false
                state.error = true
                state.personajes = []
            }) 
            .addCase(getFilterPesonajes.pending, (state) => {
                state.loading = true
                state.error = false
                state.personajes = []
            })
            .addCase(getFilterPesonajes.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.personajes= action.payload.results
                state.metaData= action.payload.info
            })
            .addCase(getFilterPesonajes.rejected, (state, action) => {
                state.metaData.pages = 1
                state.loading = false
                state.error = true
                state.personajes = []
            })
            .addCase(getPersonajesFilter.fulfilled, (state, action) => {
              state.loading = false;
              state.error = false;
              state.selected = action.payload;
            })
            .addCase(getPersonajesFilter.rejected, (state) => {
              state.loading = false;
              state.error = true;
            });
    }
})
export const { actionBusqueda , updateFavoritos, limpiarBusqueda, limpiarFavoritos} = personajesSlice.actions

export default personajesSlice.reducer
