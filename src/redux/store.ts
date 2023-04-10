import { configureStore } from '@reduxjs/toolkit'
import personajesSlice from './personajeSlide'

export const store = configureStore({
  reducer: {
    personajes: personajesSlice
  },
})

// Tipamos el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch