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
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    pokemonRepository.add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        },

        loadDetails: function(pokemon) {
            return fetch(pokemon.detailsUrl).then(function(response) {
                return response.json();
            }).then(function(details) {
                pokemon.imageURL = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            }).catch(function (e) {
                console.error(e);
            });
        },

        showDetails: function showDetails(pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function () {
                pokemonRepository.showModal(pokemon);
            });
        },

        hideModal: function hideModal() {
            let modalContainer = document.querySelector('#modal-container');
            modalContainer.classList.remove('is-visible');
        },

        showModal: function showModal(pokemon) {
                let modalContainer = document.querySelector('#modal-container');
                modalContainer.innerHTML = '';
                
                let modal = document.createElement('div');
                modal.classList.add('modal');
                
                //Add modal content
                let closeButtonElement = document.createElement('button');
                closeButtonElement.classList.add('modal-close');
                closeButtonElement.innerText = 'Close';
                closeButtonElement.addEventListener('click', pokemonRepository.hideModal);

                let titleElement = document.createElement('h1');
                titleElement.innerText = pokemon.name;

                let contentElement = document.createElement('p');
                contentElement.innerText = 'Height: ' + pokemon.height;

                let imageElement = document.createElement('img');
                imageElement.classList.add('pokemon-image');
                imageElement.src = pokemon.imageURL;

                modal.appendChild(closeButtonElement);
                modal.appendChild(titleElement);
                modal.appendChild(contentElement);
                modal.appendChild(imageElement);
                modalContainer.appendChild(modal);

                modalContainer.classList.add('is-visible');

                modalContainer.addEventListener('click', (e) => {
                    let target = e.target;
                    if (target === modalContainer) {
                        pokemonRepository.hideModal();
                    }
                });

                window.addEventListener('keydown', (e) => {
                    let modalContainer = document.querySelector('#modal-container');
                    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                        pokemonRepository.hideModal();
                    }
                });
        },
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
