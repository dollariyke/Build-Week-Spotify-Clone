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

const topPodcasts = [
  "6945004524",
  "6987111284",
  "7958865622",
  "2526838344",
  "4503899902",
  "2389444482",
  "4460913144",
  "1140232701",
  "762567663",
  "2932519662",
  "4613753548",
  "6682154564",
];

const dynamicDuosPodcasts = [
  "1479458365",
  "7969999942",
  "919949225",
  "1913763402",
  "2249258602",
  "1036183001",
  "7456464544",
  "1306931615",
  "2532117644",
  "1640842381",
  "1282523285",
  "2113355604",
];

const edmMusic = [
  "180696432",
  "179896722",
  "177337822",
  "180851592",
  "179028752",
  "174992922",
  "176299672",
  "175476642",
  "179246732",
  "174716722",
  "162913742",
  "174704752",
];

const workoutMusic = [
  "7458033284",
  "7470337224",
  "7585782982",
  "7470347344",
  "7458018624",
  "7470341484",
  "7470345864",
  "251740573",
  "1358731495",
  "2153050122",
  "1924357302",
  "1719648481",
];

const relaxAndChillMusic = [
  "1274663331",
  "3338949242",
  "7393760844",
  "1578812305",
  "1787912442",
  "1911222042",
  "1927928822",
  "1914526462",
  "952513765",
  "3526107782",
  "1390327745",
  "1281590615",
];

const bestNewReleases = [
  "1118156702",
  "1114646912",
  "1117483882",
  "1115454582",
  "1116144312",
  "1116224522",
  "1116446022",
  "1095328142",
  "1108971342",
  "1108187032",
  "1110656752",
  "1093871482",
];

const newAlbumsAndSingles = [
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

const tracksJustForYou = [
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

const playlistsJustForYou = [
  "1190301781",
  "1291471565",
  "1950512362",
  "7371445944",
  "7840420082",
  "4168772042",
  "6422922564",
  "1964028802",
  "1963962142",
  "63141574",
  "1964085082",
  "2098157264",
];

let randomColour;
let loadBrowseSection = false;
let loadPodcastSecion = false;
let loadMoodsAndGenresSection = false;

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
      if (loadPodcastSecion === false) {
        generateTopPodcasts();
        generateDynamicDuos();
        loadPodcastSecion = true;
      }
      break;
    case "MOODS AND GENRES":
      aside.className = "";
      aside.classList.add("moods-bg");
      if (loadMoodsAndGenresSection === false) {
        generateEDMMood();
        generateWorkoutMood();
        generateRelaxMood();
        loadMoodsAndGenresSection = true;
      }
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
      `<img src="${artistData.picture_medium}" class="img-fluid rounded-circle"/>` +
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

/* GENERATE TOP PODCASTS FUNCTION */

const generateTopPodcasts = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${topPodcasts[i]}`);
    const popularPlaylistsRow = document.querySelector("#top-podcasts-row");

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
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${topPodcasts[i]}`);
    const popularPlaylistsExpandRow = document.querySelector(
      "#top-podcasts-expand-section"
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
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE DYNAMIC DUOS PODCASTS FUNCTION */

const generateDynamicDuos = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${dynamicDuosPodcasts[i]}`);
    const dynamicDuosRow = document.querySelector("#dynamic-duos-row");

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
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    dynamicDuosRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${dynamicDuosPodcasts[i]}`);
    const dynamicDuosExpandRow = document.querySelector(
      "#dynamic-duos-expand-section"
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
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    dynamicDuosExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE EDM ALBUMS FUNCTION */

const generateEDMMood = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${edmMusic[i]}`);
    const edmRow = document.querySelector("#edm-row");

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
    edmRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`album/${edmMusic[i]}`);
    const edmExpandRow = document.querySelector("#edm-expand-section");

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
    edmExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE WORKOUT ALBUMS FUNCTION */

const generateWorkoutMood = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${workoutMusic[i]}`);
    const workoutRow = document.querySelector("#workout-mood-row");

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
    workoutRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${workoutMusic[i]}`);
    const workoutExpandRow = document.querySelector("#workout-expand-section");

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
    workoutExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE CHILL AND RELAX ALBUMS FUNCTION */

const generateRelaxMood = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${relaxAndChillMusic[i]}`);
    const workoutRow = document.querySelector("#chill-mood-row");

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
    workoutRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${relaxAndChillMusic[i]}`);
    const workoutExpandRow = document.querySelector("#chill-expand-section");

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
    workoutExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

function generateContent() {
  generatePopularAlbums();
  generateTrendingNowAlbums();
  generatePopularPlaylists();
}

window.onload = generateContent();

const find = async (searchQuery) => {
  const data = await deezer(`search?q=${searchQuery}`);
  console.log(data);
};
