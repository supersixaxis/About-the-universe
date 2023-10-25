const people = document.getElementById('people')
const vehicle = document.getElementById('vehicles')
const  planet = document.getElementById('planet')



async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.count;
}

async function displayPeople() {
    try {
        const numberValue = await getData('https://swapi.dev/api/people');
        people.textContent = numberValue;
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

async function displayVehicle() {
    try {
        const vehicleValue = await getData('https://swapi.dev/api/vehicles');
        vehicle.textContent = vehicleValue;
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

async function displayPlanet() {
    try {
        const planetValue = await getData('https://swapi.dev/api/planets');
        planet.textContent = planetValue;
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

displayPeople()
displayVehicle() 
displayPlanet()