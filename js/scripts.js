let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']}, 
    {name: 'Weedle', height: 0.3, type: ['bug', 'poison']}, 
    {name: 'Pikachu', height: 0.4, type: 'electric'}
];

/* for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i]
    document.write(pokemon.name + " (height: " + pokemon.height + ")");
    if (pokemon.height > 0.6) {
        document.write(" - Wow, that\’s big!");
    }
    document.write("<br>");
} */

pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + " (height: " + pokemon.height + ")");
    if (pokemon.height > 0.6) {
        document.write(" - Wow, that\’s big!");
    }
    document.write("<br>");
});