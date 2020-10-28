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

const trendingNowAlbums = [
  "180681412",
  "180996332",
  "178086012",
  "180983992",
  "181446752",
  "181270962",
  "179934622",
  "180450492",
  "178406382",
  "179902942",
  "179906172",
  "179682412",
];

const popularPlaylists = [
  "7237234924",
  "1060971691",
  "2350568586",
  "7588869202",
  "4383182182",
  "5673128942",
  "7188387004",
  "1406578475",
  "1307150595",
  "915487765",
  "1154685481",
  "3411272262",
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
    const genresContainer = document.querySelector("#genres-wrapper");
    data.forEach((e) => {
      getRandomColour();

      const newCard = document.createElement("div");
      newCard.classList.add("browse-card");
      newCard.style.backgroundColor = `rgb(${randomColour})`;
      newCard.innerHTML = `<h4 class="text-left">${e.name}</h4>`;

      genresContainer.appendChild(newCard);
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
  // TRIGGER WHEN ENTER IS PRESSED
  if (event.keyCode === 13) {
    // MAIN SELECTORS
    const searchMainContainer = document.querySelector("#search-content");
    const songsRow = document.querySelector("#songs-row");
    const artistRow = document.querySelector("#artist-row");

    // GET INPUT FROM SEARCH BAR AND CLEAR THE BAR
    const searchInput = document.querySelector(".search-bar input").value;
    document.querySelector(".search-bar input").value = ""; // Empty the search bar

    // RESET THE CONTAINER
    songsRow.innerHTML = `<h4 id="tracks-header" class="w-100">Tracks</h4>`; // Empty the search container (to replace a previous search with new content)
    artistRow.innerHTML = `<h4 id="artist-header" class="w-100">Artist</h4>`; // Empty the search container (to replace a previous search with new content)

    // UPDATE SEARCH FOR TEXT
    const searchHeader = document.querySelector(".search-header");
    searchHeader.innerText = `Search results for "${searchInput}"...`;
    searchMainContainer.appendChild(artistRow);

    // SHOW ARTIST AND TRACKS TITLES
    const artistHeader = document.querySelector("#artist-header");
    const tracksHeader = document.querySelector("#tracks-header");
    artistHeader.style.opacity = "1";
    tracksHeader.style.opacity = "1";

    // START API SEARCH
    const data = await deezer(`search?q=${searchInput}`);

    // ARTIST SEARCH AND GENERATE
    const artistID = data.data[0].artist.id;
    const artistData = await deezer(`artist/${artistID}`);

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
      `<img src="${artistData.cover_medium}" class="img-fluid rounded-circle"/>` +
      `<h5 class="mb-0">${artistData.name}</h5>` +
      `<p>Artist</p>`;

    newCard.appendChild(newCardContent);
    artistRow.appendChild(newCard);

    // TRACKS GENERATE
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
        `<img src="${data.data[i].album.cover_medium}" class="img-fluid"/>` +
        `<h5 class="mb-0">${data.data[i].title}</h5>` +
        `<p>${data.data[i].artist.name}</p>`;

      newCard.appendChild(newCardContent);
      songsRow.appendChild(newCard);
    }
    searchMainContainer.appendChild(songsRow);
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
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
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
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsExpandRow.appendChild(newCol);
  }
};

/******************************************************************/

/* GENERATE TRENDING NOW ALBUMS FUNCTION */

const generateTrendingNowAlbums = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${trendingNowAlbums[i]}`);
    const popularAlbumsRow = document.querySelector("#trending-now-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`album/${trendingNowAlbums[i]}`);
    const popularAlbumsExpandRow = document.querySelector(
      "#trending-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsExpandRow.appendChild(newCol);
  }
};

/******************************************************************/

/* GENERATE POPULAR PLAYLISTS ALBUMS FUNCTION */

const generatePopularPlaylists = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${popularPlaylists[i]}`);
    const popularPlaylistsRow = document.querySelector(
      "#popular-playlists-row"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${popularPlaylists[i]}`);
    const popularPlaylistsExpandRow = document.querySelector(
      "#popular-playlists-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsExpandRow.appendChild(newCol);
  }
};

/******************************************************************/

function generateContent() {
  generatePopularAlbums();
  generateTrendingNowAlbums();
  generatePopularPlaylists();
}

window.onload = generateContent();
