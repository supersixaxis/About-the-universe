const planetsContainer = document.querySelector(".planet_list_container")
const planetList = document.querySelector(".planet_list");
const planetResult = document.querySelector('.planet_count')
const planet = document.querySelector('.planet')
const titleShowInfos = document.querySelector('.show_infos_h1')
const ShowInfos = document.querySelector('.show_infos_planet_container')

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function displayPlanet() {
    try {
        const data = await getData('https://swapi.dev/api/planets');
        if (Array.isArray(data.results)) { 
            data.results.forEach(planet => { 
                const planetListItem = document.createElement('li');
                planetListItem.classList.add('planet') 
                planetListItem.innerHTML = `<p>${planet.name}</p><p>${planet.terrain}</p>`;
                planetList.appendChild(planetListItem); 
            });
        } else {
            console.error('La structure de la réponse de l\'API n\'est pas conforme aux attentes.');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

async function getCountPage(){
    const data = await getData('https://swapi.dev/api/planets');
    countPlanets = data.count
    planetResult.textContent = countPlanets + " resultat(s)"
}


async function showPlanetInfos(){
    const data = await getData('https://swapi.dev/api/planets');
    const planetName = target.value 
    console.log('les infos de planetes')
}


document.body.addEventListener('click', async function (event) {
    if (event.target.classList.contains('planet')) {
        const planetNameElement = event.target.firstElementChild;
        const data = await getData('https://swapi.dev/api/planets');
        if (planetNameElement) {
            const planetName = planetNameElement.textContent;
            console.log(planetName)
            const foundPlanet = data.results.find(planet => planet.name === planetName);
            if (foundPlanet) {
                const planetDiameter = foundPlanet.diameter;
                const planetClimate = foundPlanet.climate;
                titleShowInfos.style.display = 'none'
                ShowInfos.style.display = 'flex'
                console.log(`Diamètre de la planète ${planetName} : ${planetDiameter}`);
                console.log(`Climat de la planète ${planetName} : ${planetClimate}`);
            } else {
                console.log(`La planète ${planetName} n'a pas été trouvée.`);
            }
        }
    }
});

displayPlanet()
getCountPage()