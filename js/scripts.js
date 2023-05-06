let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']}, 
    {name: 'Weedle', height: 0.3, type: ['bug', 'poison']}, 
    {name: 'Pikachu', height: 0.4, type: 'electric'}
];

pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + " (height: " + pokemon.height + ")");
    if (pokemon.height > 0.6) {
        document.write(" - Wow, that\’s big!");
    }
    document.write("<br>");
});