import "./modalstats.css"
import useFetchPokemonDetails from "../../services/pokeDetails"

const StatsModal = ({description, pokename, image, pokeType, fetchUrl, onClick}) =>{
const pokemonDetails = useFetchPokemonDetails(fetchUrl)
const imageUrl = pokemonDetails ? pokemonDetails.sprites.versions['generation-vii']['icons'][image] : '';
const typin = pokemonDetails ? pokemonDetails.types.map(type=>type.type[pokeType]): [];
// const typeUrl = `https://pokeapi.co/api/v2/type/${typin}/`;
// const typeI = typeUrl
const typesString = typin.join(' ');

return(
<div className="statsmodal" onClick={onClick}>
    <div className="stats-content">
        <div className="object-content">
        <div className="tittle"><h3>{pokename}</h3></div>
            <div className="image-content">
                <div className="sprite">
                    <img src={imageUrl} alt={pokename} />
                </div>
                <div className="poke-type">{typesString}</div>
            </div>
        </div>
            <div className="description"><h6>{description}Aqui va la descripcion del pokemon, Stats, evoluciones puede ser, entre otras cosas</h6></div>
    </div>
</div>
)
}

export default StatsModal;

