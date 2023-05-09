let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
        {name: 'Weedle', height: 0.3, type: ['bug', 'poison']},
        {name: 'Pikachu', height: 0.4, type: 'electric'}
    ];

    return {
        add: function(item) {
            if (typeof item === "object") {
                let keys = Object.keys(item);
                let hasName = keys.includes("name");
                let hasHeight = keys.includes("height");
                let hasType = keys.includes("type");
                if (hasName && hasHeight && hasType) {
                    pokemonList.push(item);
                }
            }
        },

        getAll: function() {
            return pokemonList;
        }
    };
})();


pokemonRepository.add({name: 'Vulpix', height: 0.6, type: 'fire'});
pokemonRepository.getAll().forEach(printPokemon);

function printPokemon(pokemon) {
    console.log(pokemon)
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerHTML = pokemon.name;
    listItem.appendChild(button)
    pokemonList.appendChild(listItem);
}
