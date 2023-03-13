
success = (message, data) => {
    return {message, data}
}

getUniqueId = (pokemons) => {
    const pokemonIds = pokemons.map((pokemon) => pokemon.id)
    const maxId = pokemonIds.reduce((a, b) => Math.max(a,b))
    const uniqueId = maxId
    return uniqueId + 1
}
// exports.success 
module.exports = { success, getUniqueId }