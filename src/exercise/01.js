// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
// 🐨 you'll also need to get the fetchPokemon function from ../pokemon:
import {fetchPokemon, PokemonDataView} from '../pokemon'

// 💰 use it like this: fetchPokemon(pokemonName).then(handleSuccess, handleFailure)

// 🐨 create a variable called "pokemon" (using let)

// 💣 delete this now...

let data = {pokemon: null, error: null}

const getPokemon = fetchPokemon('pikachu')
  .then(pokemon => {
    data.pokemon = pokemon
    console.log(pokemon)
  })
  .catch(e => {
    data.error = e
  })

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
// 🐨 assign a pokemonPromise variable to a call to fetchPokemon('pikachu')

// 🐨 when the promise resolves, assign the "pokemon" variable to the resolved value
// 💰 For example: somePromise.then(resolvedValue => (someValue = resolvedValue))

function PokemonInfo() {
  const {pokemon, error} = data
  if (data.error) throw error
  if (!data.pokemon) throw getPokemon
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

const ErrorFallback = props => {
  return <p>{JSON.stringify(props.error.message)}</p>
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <React.Suspense fallback={<p>Loading..</p>}>
            <PokemonInfo />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
