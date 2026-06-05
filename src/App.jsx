import './App.css'
import PokemonDetails from "./components/PokemonDetails/PokemonDetails.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [pokemons, setPokemon] = useState([])
    const [error, toggleError] = useState(false)
    const [offset, setOffset] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;


    async function getPokemon() {
        toggleError(false)
        try {
            const result = await axios.get(url);
            setPokemon(result.data.results);
            setNextPage(result.data.next);
        } catch (e) {
            console.error(e)
            toggleError(true)
        }
    }

    useEffect(() => {
        getPokemon();
    }, [offset]);

    return (
        <>

            <h1>Gotta catch em all!</h1>
            {error && <p>Er ging iets mis. Probeer het opnieuw.</p>}

            {offset >= 20 &&
                <button
                    onClick={() => setOffset(offset - 20)}>
                    Vorige 20 Pokémon
                </button>}

            {nextPage && (
                <button
                    onClick={() => setOffset(offset + 20)}>
                    Volgende 20 Pokémon
                </button>)
            }




            <div className="pokemon-cards">
                {pokemons.map(pokemon => (
                    <PokemonDetails
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                    />
                ))}
            </div>
        </>

    )
}

export default App
