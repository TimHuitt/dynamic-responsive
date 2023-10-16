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

function fillMenu(category) {
  const isMobile = $('.header-nav ul').data('mobile');
  !isMobile && $('.menu-container').empty();
  isMobile && $('.menu-sub-mobile').empty();
  const divtype = (isMobile) ? "menu-div-mobile" : "menu-div";
  
  for (let sub in categories[category]) {
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


function buildMenu() {
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

function hideMenu() {
  $('.menu-container').removeClass('show-menu');
  $('.menu-container-mobile').removeClass('show-menu');
  $('.menu-sub-mobile').removeClass('show-menu');
}

buildMenu();

window.onresize = function(event) {
  hideMenu();
  buildMenu();
};

$('.header-nav ul').on('mouseenter', '.header-menu', function(event) {
  const vw = window.innerWidth;
  const isMobile = (vw < 600) ? 1 : 0;
  if (!isMobile) {
    if ((event.type !== 'click' && event.type !== 'mouseenter') || !$('.menu-container').data('state')) {
      $('.menu-container').addClass('show-menu');
      $('.menu-container').data('state', 1);
      fillMenu($(this).text());
      $('.menu-div').addClass('show-item');
    }
  }
});


$('.header-nav ul').on('click', '.header-menu', function(event) {
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
});

$('.header-nav ul').on('mouseleave', '.header-menu', function(event) {
  if (event.type === 'mouseleave') {
    $('.menu-container').data('hold', 1);
    $('.menu-container').data('state', 0);
  }
});

$('.upper-nav-container li').on('click mouseleave', function(event) {
  $('.menu-container').data('hold', 0);
});

$('.menu-container, .menu-container-mobile').on('mouseleave', function() {
  $(this).removeClass('show-menu');
});

$('.menu-container, .menu-container-mobile').on('mouseleave', function() {
  $(this).removeClass('show-menu');
  $('.menu-sub-mobile').removeClass('show-menu');
});

$('.menu-sub-mobile').on('mouseenter', function() {
  $('.menu-container-mobile').addClass('show-menu');
  $('.menu-sub-mobile').addClass('show-menu');
});

$('.menu-container-mobile ul').on('click', '.header-menu', function() {
  $('.menu-sub-mobile').addClass('show-menu');
  $('.menu-container-mobile li').addClass('darker');
  $(this).removeClass('darker');
  $('.menu-container-mobile li').addClass('side');
  fillMenu($(this).text());
});

$('.header-image, .content-container').on('mouseenter', hideMenu);

$('.menu-sub-mobile, .menu-container-mobile,').on('scroll', function(event) {
  event.stopPropagation();
});

$('body').on('scroll click', hideMenu);

