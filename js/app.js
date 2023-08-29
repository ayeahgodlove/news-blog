let newRepository = (function () {
  const API_KEY = "ffab185909c1410b99744b660b3ec567";
  const API_URL = `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=${API_KEY}`;
  let newsItemList = [];

  return {
    add: function (newsItem) {
      if (typeof newsItem === "object") {
        let keys = Object.keys(newsItem);
        let hasTitle = keys.includes("title");
        let hasDescription = keys.includes("description");
        if (hasTitle && hasDescription) {
          newsItemList.push(newsItem);
        }
      }
    },

    getAll: function () {
      return newsItemList;
    },

    addListItem: function (article) {
      let articleListEle = document.querySelector(".article-list");
      //create card container
      let cardContainer = document.createElement("div");
      cardContainer.classList.add("card", "mb-3");
      cardContainer.classList.add("mb-3");
      cardContainer.style.width = "19rem";

      //image
      let imgEl = document.createElement("img");
      imgEl.classList.add("card-img-top", "img-fluid");
      imgEl.src = article.imageUrl;
      cardContainer.appendChild(imgEl);

      //card body
      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      // create children of the card body
      let heading = document.createElement("h5");
      heading.classList.add("card-title");
      heading.innerHTML = article.title;

      let paragraph = document.createElement("p");
      paragraph.classList.add("card-text");
      heading.innerHTML = article.description;

      let button = document.createElement("button");
      // data-bs-toggle="modal" data-bs-target="#exampleModal"
      button.setAttribute("data-bs-toggle", "modal");
      button.setAttribute("data-bs-target", "#modal-container");
      button.classList.add("btn", "btn-primary", "btn-sm");
      button.innerHTML = "Read more ->";

      //register to cardBody
      cardBody.appendChild(heading);
      cardBody.appendChild(paragraph);
      cardBody.appendChild(button);

      //register cardBody to cardContainer
      cardContainer.appendChild(cardBody);
      articleListEle.appendChild(cardContainer);

      cardBody.addEventListener("click", function () {
        newRepository.showDetails(article);
      });
    },

    loadList: async function () {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        const { articles } = json;
        articles.forEach(function (item) {
          let article = {
            title: item.title,
            description: item.description,
            imageUrl: item.urlToImage,
            author: item.author,
            publishedAt: item.publishedAt,
            source: item.source.name,
          };
          newRepository.add(article);
        });
      } catch (e) {
        console.error(e);
      }
    },

    showDetails: function showDetails(article) {
      newRepository.showModal(article);
    },

    hideModal: function hideModal() {
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.classList.remove("is-visible");
    },

    showModal: function showModal(article) {
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";

      let modalDialog = document.createElement("div");
      modalDialog.classList.add("modal-dialog");

      let modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");

      let modalHeader = document.createElement("div");
      modalHeader.classList.add("modal-header");

      let modalBody = document.createElement("div");
      modalBody.classList.add("modal-body");

      //Add modal content
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("btn-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", newRepository.hideModal);

      let titleElement = document.createElement("h5");
      titleElement.innerText = article.title;
      //add to modal header
      modalHeader.appendChild(titleElement);
      modalHeader.appendChild(closeButtonElement);

      modalContent.appendChild(modalHeader);

      let descriptionElement = document.createElement("p");
      descriptionElement.innerText = article.description;

      let contentElement = document.createElement("p");
      contentElement.innerText = article.content;

      let imageElement = document.createElement("img");
      imageElement.classList.add("img-fluid");
      imageElement.src = article.urlToImage;

      modalBody.appendChild(imageElement); //image first
      modalBody.appendChild(descriptionElement); //description
      modalBody.appendChild(contentElement); //content

      //append body to content
      modalContent.appendChild(modalBody);
      modalDialog.appendChild(modalContent);
      // modal.appendChild(modalDialog);

      modalContainer.appendChild(modalDialog);

      modalContainer.classList.add("is-visible");

      modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
          newRepository.hideModal();
        }
      });

      window.addEventListener("keydown", (e) => {
        let modalContainer = document.querySelector("#modal-container");
        if (
          e.key === "Escape" &&
          modalContainer.classList.contains("is-visible")
        ) {
          newRepository.hideModal();
        }
      });
    },
  };
})();

newRepository.loadList().then(function () {
  newRepository.getAll().forEach(function (article) {
    newRepository.addListItem(article);
  });
});
