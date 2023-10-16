
// Content Creation //

// set up menu options
const categories = {
  "Solar System": {
    "The Sun": ["Photosphere", "Chromosphere", "Corona"],
    "Inner Solar System": ["Asteroid Belt", "Terrestrial Planets"],
    "Outer Solar System": ["Gas Giants", "Kuiper Belt", "Oort Cloud"],
    "Space Exploration": ["Space Probes", "Human Missions"],
  },
  "Celestial Bodies": {
    Moons: ["Luna", "Titan", "Ganymede", "Io"],
    Asteroids: ["Ceres", "Vesta", "Eros"],
    Comets: ["Halley's Comet", "Comet NEOWISE"],
    "Dwarf Planets": ["Pluto", "Haumea", "Makemake"],
  },
  "Exoplanets": {
    "Exoplanet Discoveries": ["Kepler-186f", "Trappist-1e", "Proxima Centauri b"],
    "Habitable Zone": ["Goldilocks Zone"],
    "Exoplanet Characteristics": ["Hot Jupiters", "Super-Earths"],
  },
  "Exploration": {
    "Space Agencies": ["NASA (USA)", "ESA (Europe)", "Roscosmos (Russia)"],
    Astronauts: ["Neil Armstrong", "Valentina Tereshkova", "Sally Ride"],
    Spacecraft: ["Hubble Space Telescope", "Curiosity Rover", "International Space Station (ISS)"],
  },
  "Colonization": {
    "Mars Colonization": ["City Building", "Agriculture", "Terraforming"],
    "Moon Bases": ["Artemis Program", "Lunar Gateway"],
  },
};


// Functions and Handlers //

// build sub-menu and fill options based on obj sub-category
function fillMenu(category) {
  const isMobile = $('.header-nav ul').data('mobile');
  !isMobile && $('.menu-container').empty();
  isMobile && $('.menu-sub-mobile').empty();
  const divtype = (isMobile) ? "menu-div-mobile" : "menu-div";
  
  // loop each category in categories obj
  for (let sub in categories[category]) {
    // create new list container
    const menuElement = `
      <div class="${divtype}">
        <h1>${sub}</h1>
        <ul>
        </ul>
      </div>
    `
    const linkList = [];
    
    for (let link in categories[category][sub]) {
      linkList.push(`<li>${categories[category][sub][link]}</li>`);
    }
    
    if (isMobile) {
      $('.menu-sub-mobile').append(menuElement);
      $(`.menu-div-mobile:contains("${sub}") ul`).append(linkList);
    } else {
      $('.menu-container').append(menuElement);
      $(`.menu-div:contains("${sub}") ul`).append(linkList);
    }
  }
}

// build main menu options based on obj main categories
function initMenu() {
  $('.header-nav ul, .menu-container-mobile ul').empty();
  const vw = window.innerWidth;
  const isMobile = (vw < 600) ? 1 : 0;
  
  if (isMobile) {
    const element = `
      <li class="bar-container header-menu">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path class="bar" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
      </li>
    `
    $('.header-nav ul').append(element);
    
    for (let category in categories) {
      const element = `<li class="header-menu">${category}</li>`
      $('.menu-container-mobile ul').append(element);
    }
    $('.header-nav ul').data('mobile', 1);
    
  } else {
    for (let category in categories) {
      const element = `<li class="header-menu">${category}</li>`
      $('.header-nav ul').append(element);
    }
    $('.header-nav ul').data('mobile', 0);
  }
}

// handle header hover events
function handleMouse(event, element) {
  const vw = window.innerWidth;
  const isMobile = (vw < 600) ? 1 : 0;

  if (!isMobile) {
    if ((event.type !== 'click' && event.type !== 'mouseenter') || !$('.menu-container').data('state')) {
      $('.menu-container').addClass('show-menu');
      $('.menu-container').data('state', 1);
      fillMenu($(element).text());
      $('.menu-div').addClass('show-item');
    }
  }
}

// handle header mobile click events
function handleMobile() {
  const vw = window.innerWidth;
  const isMobile = (vw < 600) ? 1 : 0;

  if (isMobile) {
    $('.menu-container-mobile').toggleClass('show-menu');
    $('.menu-container-mobile li').removeClass('side');
    $('.menu-container-mobile li').removeClass('darker');
    $('.menu-sub-mobile').removeClass('show-menu');
  }

  $('body').addClass('disabled');

  setTimeout(function() {
    $('body').removeClass('disabled');
  },500);
}

// handle side menu display
function handleSideMenu(element) {
  $('.menu-sub-mobile').addClass('show-menu');
  $('.menu-container-mobile li').addClass('darker');
  $(element).removeClass('darker');
  $('.menu-container-mobile li').addClass('side');
  fillMenu($(element).text());
}

// hide all menus
function hideMenu() {
  $('.menu-container').removeClass('show-menu');
  $('.menu-container-mobile').removeClass('show-menu');
  $('.menu-sub-mobile').removeClass('show-menu');
}

// initalize menu
initMenu();


// Listeners //

// resizing responsiveness
window.onresize = function(event) {
  hideMenu();
  initMenu();
};

// main header hover (mouse)
$('.header-nav ul').on('mouseenter', '.header-menu', function(event) {
  handleMouse(event, this);
});

// main header click (mobile tap)
$('.header-nav ul').on('click', '.header-menu', function() {
  handleMobile();
});

// control header navigation hover events
// state = menu is, 1: active 0: hidden
$('.header-nav ul').on('mouseleave', '.header-menu', function(event) {
    $('.menu-container').data('state', 0);
});

// mobile menu click
$('.menu-container-mobile ul').on('click', '.header-menu', function() {
  handleSideMenu(this);
});

// hide menu on focus loss
$('.header-image, .content-container, .header-image').on('click scroll', hideMenu);
