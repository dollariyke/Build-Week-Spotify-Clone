const browseCategories = [
  "Podcasts",
  "Made For You",
  "Charts",
  "New Releases",
  "Discover",
  "COVID-19 Guide",
  "Black History Is Now",
  "Pop",
  "Hip Hop",
  "Mood",
  "Workout",
  "Alternative",
  "At Home",
  "Rock",
  "Shows with music",
  "Dance / Electronic",
  "In the car",
  "R&B",
  "Party",
  "Indie",
  "Chill",
  "Throwback",
  "Caribbean",
  "Gaming",
  "Sleep",
  "Pride",
  "Classical",
  "Wellness",
  "Spotify Singles",
  "Trending",
  "Desi",
  "Jazz",
  "RADAR",
  "Tastemakers",
  "Afro",
  "League of Legends",
  "Country",
  "Romance",
  "Metal",
  "Focus",
  "Soul",
  "Comedy",
  "Folk & Acoustic",
  "Student",
  "Arab",
  "Punk",
  "Kids & Family",
  "Cooking & Dining",
  "K-Pop",
  "Blues",
  "Travel",
  "Latin",
  "Funk",
  "Listening Together",
];

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

let randomColour;
let loadBrowseSection = false;

function getRandomColour() {
  let randomColourR = Math.floor(Math.random() * 166) + 89;
  let randomColourG = Math.floor(Math.random() * 166) + 89;
  let randomColourB = Math.floor(Math.random() * 166) + 89;
  randomColour = `${randomColourR},${randomColourG},${randomColourB}`;
}

function generateBrowse() {
  if (loadBrowseSection === false) {
    const browseBody = document.querySelector("#search .main-wrapper");

    for (let i = 0; i < browseCategories.length; i++) {
      getRandomColour();

      const newCard = document.createElement("div");
      newCard.classList.add("browse-card");
      newCard.style.backgroundColor = `rgb(${randomColour})`;
      newCard.innerHTML = `<h4 class="text-left">${browseCategories[i]}</h4>`;

      browseBody.appendChild(newCard);
    }
  }
  loadBrowseSection = true;
}

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
      generateBrowse();
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
