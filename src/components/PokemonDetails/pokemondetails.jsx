import { Link, useParams } from "react-router-dom";
import './PokemonDetails.css';
import usePokemonDetails from "../../hooks/usePokemonDetails";
import { getTypeColor, getTypeGradient } from "../../utils/typeColors";

function capitalize(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokemonDetails({ pokemonName }) {
    const { id } = useParams();
    const [pokemon, isLoading, hasError] = usePokemonDetails(id, pokemonName);

    if (isLoading) {
        return <div className="pokemon-details-status">Loading...</div>;
    }

    if (hasError || !pokemon) {
        return (
            <div className="pokemon-details-status pokemon-details-error">
                <p>Pokemon not found. Check the name/spelling and try again.</p>
                <Link to="/" className="back-link">← Back to Pokedex</Link>
            </div>
        );
    }

    return (
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-hero" style={{ background: getTypeGradient(pokemon.types) }}>
                <img className="pokemon-details-image" src={pokemon.image} alt={pokemon.name} />
                <div className="pokemon-details-name"><span>{capitalize(pokemon.name)}</span></div>

                <div className="pokemon-details-types">
                    {pokemon.types.map((t) => (
                        <div key={t} style={{ backgroundColor: getTypeColor(t) }}>{t}</div>
                    ))}
                </div>
            </div>

            <div className="pokemon-details-info">
                <div className="info-block">
                    <span className="info-label">Height</span>
                    <span className="info-value">{pokemon.height} m</span>
                </div>
                <div className="info-block">
                    <span className="info-label">Weight</span>
                    <span className="info-value">{pokemon.weight} kg</span>
                </div>
            </div>

            {pokemon.similarPokemons.length > 0 && (
                <div className="similar-section">
                    <h3>More {pokemon.types[0]} type pokemons</h3>
                    <ul className="similar-list">
                        {pokemon.similarPokemons.map((p) => (
                            <li key={p.pokemon.url}>
                                <Link to={`/pokemon/${p.pokemon.name}`}>{capitalize(p.pokemon.name)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;
