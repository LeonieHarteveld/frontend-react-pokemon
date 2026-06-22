import './App.css'
import PokemonDetails from "./components/PokemonDetails/PokemonDetails.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import logo from "../src/assets/logo.jpg"


function App() {

    const [pokemons, setPokemon] = useState([])
    const [error, toggleError] = useState(false)
    const [offset, setOffset] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

    useEffect(() => {
        const controller = new AbortController();

    async function getPokemon() {
        toggleError(false)
        setLoading(true);
        try {
            const result = await axios.get(url, {
                signal: controller.signal,
            });

            setPokemon(result.data.results);
            setNextPage(result.data.next);
        } catch (e) {
            console.error(e)
            toggleError(true)
        } finally {
            setLoading(false);
        }
    }
        getPokemon();

        return () => {
            controller.abort();
        };
    }, [offset]);



    return (
        <div className="outer-container">

            <div><img src={logo} alt="pokemon logo"/></div>

            <h1>Gotta catch em all!</h1>

            {loading && <p>Pokémon worden geladen...</p>}
            {error && <p>Er ging iets mis. Probeer het opnieuw.</p>}

            <div className="button-wrapper">
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
            </div>

            {!loading && (
            <div className="pokemon-cards">
                {pokemons.map(pokemon => (
                    <PokemonDetails
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                    />
                ))}
            </div>
            )}
        </div>

    )
}

export default App
