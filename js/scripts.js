let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    return {
        add: function(pokemon) {
            if (typeof pokemon === "object") {
                let keys = Object.keys(pokemon);
                let hasName = keys.includes("name");
                let hasUrl = keys.includes("detailsUrl");
                if (hasName && hasUrl) {
                    pokemonList.push(pokemon);
                }
            }
        },

        getAll: function() {
            return pokemonList;
        },

        addListItem: function(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = (pokemon.name);
            button.classList.add('pokemonButton');
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
            button.addEventListener('click', function() { pokemonRepository.showDetails(pokemon) });
        },

        loadList: function() {
            console.log('Loading Pokemons...');
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function (json) {
                console.log('Pokemons loaded.');
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    pokemonRepository.add(pokemon);
                });
            }).catch(function (e) {
                console.log('Error loading Pokemons!');
                console.error(e);
            })
        },

        loadDetails: function(pokemon) {
            console.log('Loading ' + pokemon.name + '...');
            return fetch(pokemon.detailsUrl).then(function(response) {
                return response.json();
            }).then(function(details) {
                console.log(pokemon.name + ' loaded!');
                pokemon.imageURL = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            }).catch(function (e) {
                console.log('Error loading Pokemon ' + pokemon.name + '!');
                console.error(e);
            });
        },

        showDetails: function showDetails(pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function () {
                console.log(pokemon);
            });
        }

    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



