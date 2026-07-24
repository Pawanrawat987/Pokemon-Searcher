import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id, pokemonName) {
    const [state, setState] = useState({ pokemon: null, isLoading: true, hasError: false });

    async function downloadPokemon() {
        setState({ pokemon: null, isLoading: true, hasError: false });
        try {
            const identifier = pokemonName || id;
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pokemon/${identifier}`);
            const data = response.data;

            const primaryType = data.types?.[0]?.type?.name || '';
            const sameTypePokemons = primaryType
                ? await axios.get(`${import.meta.env.VITE_API_BASE_URL}/type/${primaryType}`)
                : null;

            setState({
                isLoading: false,
                hasError: false,
                pokemon: {
                    name: data.name,
                    image: data.sprites?.other?.dream_world?.front_default || data.sprites?.front_default,
                    // PokeAPI sends height in decimetres and weight in hectograms,
                    // convert to metres / kilograms so the numbers actually make sense
                    height: (data.height / 10).toFixed(1),
                    weight: (data.weight / 10).toFixed(1),
                    types: data.types.map((t) => t.type.name),
                    similarPokemons: sameTypePokemons
                        ? sameTypePokemons.data.pokemon.filter((p) => p.pokemon.name !== data.name)
                        : [],
                },
            });
        } catch (error) {
            setState({ pokemon: null, isLoading: false, hasError: true });
        }
    }

    useEffect(() => {
        downloadPokemon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, pokemonName]);

    return [state.pokemon, state.isLoading, state.hasError];
}

export default usePokemonDetails;
