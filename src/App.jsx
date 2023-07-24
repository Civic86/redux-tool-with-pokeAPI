import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonImage } from './store/pokemonSlice';

function App() {
  const [pokemonInput, setPokemonInput] = useState('');
  const dispatch = useDispatch();
  const { name, image, status, error } = useSelector((state) => state.pokemon);

  const handleInputChange = (event) => {
    setPokemonInput(event.target.value);
  };

  const handleFetchPokemon = () => {
    if (pokemonInput.trim() !== '') {
      dispatch(fetchPokemonImage(pokemonInput.toLowerCase()));
    }
  };

  return (
    <div>
      <h1>Pokemon Image Fetcher</h1>
      <div>
        <input type="text" value={pokemonInput} onChange={handleInputChange} />
        <button onClick={handleFetchPokemon}>Fetch</button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && name && (
        <div>
          <h2>{name}</h2>
          <img src={image} alt={name} />
        </div>
      )}
    </div>
  );
}

export default App;
