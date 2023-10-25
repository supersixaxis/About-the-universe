const planetsContainer = document.querySelector(".planet_list_container")
const planetList = document.querySelector(".planet_list");
const planetResult = document.querySelector('.planet_count')

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

displayPlanet()
getCountPage()