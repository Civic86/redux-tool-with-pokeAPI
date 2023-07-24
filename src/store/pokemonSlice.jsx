import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonImage = createAsyncThunk(
  'pokemon/fetchPokemonImage',
  async (pokemonNameOrId) => {
    const response = await axios.get(`${POKE_API_BASE_URL}/pokemon/${pokemonNameOrId}`);
    return {
      name: response.data.name,
      image: response.data.sprites.front_default,
    };
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    name: null,
    image: null,
    status: 'idle', // 初期状態は 'idle'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonImage.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.name = action.payload.name;
        state.image = action.payload.image;
      })
      .addCase(fetchPokemonImage.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
