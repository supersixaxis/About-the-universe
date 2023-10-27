const planetsContainer = document.querySelector(".planet_list_container");
const planetList = document.querySelector(".planet_list");
const planetResult = document.querySelector('.planet_count');
const titleShowInfos = document.querySelector('.show_infos_h1');
const ShowInfos = document.querySelector('.show_infos_planet_container');
const diameter = document.querySelector('.infos_diameter');
const climate = document.querySelector('.infos_climate');
const gravity = document.querySelector('.infos_gravity');
const terrain = document.querySelector('.infos_terrain');
const population = document.querySelector('.population');
const namePlanet = document.querySelector(".planetName");
const sortPopulation = document.querySelector("#sort")
const loader = document.querySelector('.loader');
const planetListContainer = document.querySelector('.planet_list_container');
const searchBar = document.getElementById('searchPlanets');
planetListContainer.classList.add('loading');
planetListContainer.classList.add('loaded');
loader.style.display = 'block';
let allPlanets = []; 

async function getData(url, page = 1) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    return data;
}

async function fetchAllPlanets() {
    try {
        let nextPage = "https://swapi.dev/api/planets/";

        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();

            if (Array.isArray(data.results)) {
                allPlanets = allPlanets.concat(data.results);
            } else {
                console.error('La structure de la réponse de l\'API n\'est pas conforme aux attentes.');
                break;
            }

            nextPage = data.next;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des planètes :', error);
        throw error;
    }
}

function displayPlanetsInHTML() {
    try {
            loader.style.display = 'none';
            planetListContainer.classList.remove('loading');
            updatePlanetList(allPlanets)
            getCountPage(allPlanets)
    } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'affichage des planètes dans le HTML :', error);
    }
}

async function fetchAndDisplayPlanets() {
    try {
        await fetchAllPlanets();
        displayPlanetsInHTML();
    } catch (error) {
        console.error('Une erreur s\'est produite lors du traitement des planètes :', error);
    }
}

async function getCountPage(planets) {
    const countPlanets = planets.length;
    planetResult.textContent = countPlanets + " resultat(s)";
}

async function showPlanetInfos(event) {
    const planetNameElement = event.target.firstElementChild;
    if (planetNameElement) {
        const planetName = planetNameElement.textContent;
        const foundPlanet = allPlanets.find(planet => planet.name === planetName);
        if (foundPlanet) {
            const planetDiameter = foundPlanet.diameter;
            const planetClimate = foundPlanet.climate;
            const planetGravity = foundPlanet.gravity;
            const planetTerrain = foundPlanet.terrain;
            const planetPopulation = foundPlanet.population;
            titleShowInfos.style.display = 'none';
            ShowInfos.style.display = 'block';
            diameter.textContent = planetDiameter;
            climate.textContent = planetClimate;
            gravity.textContent = planetGravity;
            terrain.textContent = planetTerrain;
            population.innerHTML = `<span class="mark">Population : </span>${planetPopulation}`;
            namePlanet.textContent =  planetName;
        } 
    }
}
document.body.addEventListener('click', showPlanetInfos);

let currentSearchTerm = '';
let currentPopulationFilter = '';

searchBar.addEventListener('input', function() {
    currentSearchTerm = searchBar.value.toLowerCase();
    updatePlanetList();
});

sortPopulation.addEventListener('change', function(event) {
    currentPopulationFilter = event.target.value;
    updatePlanetList();
});

function updatePlanetList() {
    const searchTerm = currentSearchTerm;
    const populationFilter = currentPopulationFilter;

    let filteredPlanets = allPlanets;
    if (searchTerm) {
        filteredPlanets = filteredPlanets.filter(planet => planet.name.toLowerCase().startsWith(searchTerm));
    }

    switch (populationFilter) {
        case 'lowPopulation':
            filteredPlanets = filteredPlanets.filter(planet => {
                const population = parseInt(planet.population, 10);
                return population >= 0 && population <= 100000;
            });
            break;
        case 'mediumPopulation':
            filteredPlanets = filteredPlanets.filter(planet => {
                const population = parseInt(planet.population, 10);
                return population >= 100000 && population <= 100000000;
            });
            break;
        case 'bigPopulation':
            filteredPlanets = filteredPlanets.filter(planet => {
                const population = parseInt(planet.population, 10);
                return population >= 100000000;
            });
            break;
    }

    updatePlanetListUI(filteredPlanets);
};

function updatePlanetListUI(planets) {
    planetList.innerHTML = '';
    planets.forEach(planet => {
        const planetListItem = document.createElement('li');
        planetListItem.classList.add('planet');
        planetListItem.innerHTML = `<p>${planet.name}</p><p>${planet.terrain}</p>`;
        planetList.appendChild(planetListItem);
    });
    getCountPage(planets);
}



async function onInit() {
    await fetchAndDisplayPlanets();
}

onInit();
