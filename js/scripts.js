let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
        {name: 'Weedle', height: 0.3, type: ['bug', 'poison']},
        {name: 'Pikachu', height: 0.4, type: 'electric'}
    ];

    function showDetails(pokemon) {
        console.log(pokemon);
    }

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
        },

        addListItem: function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = (pokemon.name);
            button.classList.add('pokemonButton');
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
            button.addEventListener('click', function() { showDetails(pokemon) });
        }
    };
})();

pokemonRepository.add({name: 'Vulpix', height: 0.6, type: 'fire'});
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
})

//function printPokemon(pokemon)
