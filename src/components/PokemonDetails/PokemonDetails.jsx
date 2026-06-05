import './PokemonDetails.css'
import {useEffect, useState} from "react";
import axios from "axios";

function PokemonDetails({ name, url }) {

    const [pokemon, setPokemon] = useState([])
    const [error, toggleError] = useState(false)

    useEffect(() => {

        async function getPokemon() {
            toggleError(false)
            try {
                const result = await axios.get(url);
                setPokemon(result.data);
            } catch (e) {
                console.error(e)
                toggleError(true)
            }
        }
        getPokemon();
    }, []);

    return (
        <>
            {error && <p>Er ging iets mis</p>}

            <article className="pokemon-details">
                <h2>{name}</h2>
                <img
                    src={pokemon.sprites?.back_default}
                    alt={`Afbeelding van ${name}`}
                />
                <p>
                    <span className="attributes">Moves:</span>
                        {pokemon.moves?.length}
                </p>
                <p>
                    <span className="attributes">Weight:</span>
                    {pokemon.weight}
                </p>
               <div>
                   <span className="attributes">Abilities:</span>
                <ul>
                    {pokemon.abilities?.map((ability) => (
                        <li key={ability.ability.name}>
                            {ability.ability.name}
                        </li>))}
                </ul>
               </div>
            </article>
        </>
    )
}

export default PokemonDetails