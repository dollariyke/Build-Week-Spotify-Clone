/* GLOBAL VARIABLES */

const allGenres = [];
const popularAlbums = [
  "176538582",
  "11244086",
  "161984202",
  "162683632",
  "157795452",
  "137217782",
  "169236642",
  "110040592",
  "91598612",
  "122429752",
  "159826232",
  "15478674",
];

let randomColour;
let loadBrowseSection = false;

/******************************************************************/

/* SWITCH ACTIVE FUNCTION */

function switchActive() {
  const clickedLink = event.currentTarget.parentNode;
  const allNavLinks = document.querySelectorAll(".link-item");

  allNavLinks.forEach((e) => {
    if (e.classList.contains("active")) {
      e.classList.remove("active");
    }
  });
  clickedLink.classList.add("active");
}

/******************************************************************/

/* SWITCH BG FUNCTION */

function switchBGColour() {
  const aside = document.querySelector("aside");
  const clickedLink = event.currentTarget.innerText;

  switch (clickedLink) {
    case "TRENDING":
      aside.className = "";
      aside.classList.add("trending-bg");
      break;
    case "PODCAST":
      aside.className = "";
      aside.classList.add("podcasts-bg");
      break;
    case "MOODS AND GENRES":
      aside.className = "";
      aside.classList.add("moods-bg");
      break;
    case "NEW RELEASES":
      aside.className = "";
      aside.classList.add("newreleases-bg");
      break;
    default:
      aside.className = "";
      aside.classList.add("discover-bg");
  }
}

/******************************************************************/

/* RANDOM COLOUR FUNCTION */

function getRandomColour() {
  let randomColourR = Math.floor(Math.random() * 166) + 89;
  let randomColourG = Math.floor(Math.random() * 166) + 89;
  let randomColourB = Math.floor(Math.random() * 166) + 89;
  randomColour = `${randomColourR},${randomColourG},${randomColourB}`;
}

/******************************************************************/

/* GENERATE GENRES FUNCTION */

const generateGenres = async () => {
  const data = await getGenres();

  if (loadBrowseSection === false) {
    const browseBody = document.querySelector("#search .main-wrapper");
    data.forEach((e) => {
      getRandomColour();

      const newCard = document.createElement("div");
      newCard.classList.add("browse-card", "swing-in-top-fwd");
      newCard.style.backgroundColor = `rgb(${randomColour})`;
      newCard.innerHTML = `<h4 class="text-left">${e.name}</h4>`;

      browseBody.appendChild(newCard);
    });
  }

  loadBrowseSection = true;
};

/******************************************************************/

/* SHOW SECTION FUNCTION */

function showSection() {
  const sections = document.querySelectorAll("aside");
  const clickedLink = event.currentTarget.innerText;

  switch (clickedLink) {
    case "Home":
      sections[1].classList.add("d-none");
      sections[2].classList.add("d-none");
      sections[0].classList.remove("d-none");
      break;
    case "Search":
      sections[0].classList.add("d-none");
      sections[2].classList.add("d-none");
      sections[1].classList.remove("d-none");
      generateGenres();
      break;
    case "Your Library":
      sections[0].classList.add("d-none");
      sections[1].classList.add("d-none");
      sections[2].classList.remove("d-none");
      break;
    default:
  }
  switchActive();
}

/******************************************************************/

/* SEARCH FUNCTION */

const search = async () => {
  if (event.keyCode === 13) {
    const searchMainContainer = document.querySelector("#search-content");
    const firstRow = document.querySelector("#search-row");

    const searchInput = document.querySelector(".search-bar input").value;
    document.querySelector(".search-bar input").value = "";

    const searchContent = document.querySelector("#search-row");
    searchContent.innerHTML = "";

    const searchHeader = document.querySelector(".search-header");
    searchHeader.innerText = `Search results for "${searchInput}"...`;
    searchMainContainer.appendChild(firstRow);

    const data = await deezer(`search?q=${searchInput}`);

    for (let i = 0; i < data.data.length - 1; i++) {
      const newCard = document.createElement("div");
      newCard.classList.add(
        "col-sm-12",
        "col-md-6",
        "col-lg-4",
        "col-xl-2",
        "mb-2",
        "px-0",
        "pr-md-2",
        "flip-in-hor-bottom"
      );

      const newCardContent = document.createElement("div");
      newCardContent.classList.add("album-card");

      newCardContent.innerHTML =
        `<img src="${data.data[i].album.cover_xl}" class="img-fluid"/>` +
        `<h5>${data.data[i].title}</h5>` +
        `<p>${data.data[i].artist.name}</p>`;

      newCard.appendChild(newCardContent);
      firstRow.appendChild(newCard);
    }
  }
};

/******************************************************************/

/* GENERATE POPULAR ALBUMS FUNCTION */

const generatePopularAlbums = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${popularAlbums[i]}`);
    const popularAlbumsRow = document.querySelector("#popular-albums-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "pr-lg-3",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_xl}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`album/${popularAlbums[i]}`);
    const popularAlbumsExpandRow = document.querySelector(
      "#popular-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "pr-lg-3"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_xl}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsExpandRow.appendChild(newCol);
  }
};

/******************************************************************/

window.onload = generatePopularAlbums;

const find = async () => {
  const data = await deezer(`search?q=edsheeran`);
  console.log(data);
};
