// Henter data fra API
const getData = async () => {
  const response = await fetch(
    "https://api.sampleapis.com/futurama/characters"
  );
  const api = await response.json();
  return api;
};

// Parser dataen
const parseData = (json) => {
  return json.map((character) => ({
    name: character.name,
    species: character.species,
    age: character.age,
    image: character.images.main,
    homePlanet: character.homePlanet,
    occupation: character.occupation,
  }));
};
// Lager HTML elementer
const renderDataToHTML = (data) => {
  const container = document.getElementById("data-container");
  container.innerHTML = "";

  // Lager en div for hver karakter
  data.forEach((item) => {
    // Lager elementer for hver karakter
    const characterDiv = document.createElement("div");
    characterDiv.className = "character";

    const nameElement = document.createElement("h2");
    nameElement.textContent = `Name: ${item.name.first} ${item.name.middle} ${item.name.last}`;
    characterDiv.appendChild(nameElement);

    const speciesElement = document.createElement("p");
    speciesElement.textContent = `Species: ${item.species}`;
    characterDiv.appendChild(speciesElement);

    const ageElement = document.createElement("p");
    ageElement.textContent = `Age: ${item.age}`;
    characterDiv.appendChild(ageElement);

    // Hvis homePlanet er undefined, så vises det ikke noe
    if (item.homePlanet === undefined) {
      const homePlanetElement = document.createElement("p");
      homePlanetElement.textContent = ``;
      characterDiv.appendChild(homePlanetElement);
    } else {
      const homePlanetElement = document.createElement("p");
      homePlanetElement.textContent = `Home Planet: ${item.homePlanet}`;
      characterDiv.appendChild(homePlanetElement);
    }

    const occupationElement = document.createElement("p");
    occupationElement.textContent = `Occupation: ${item.occupation}`;
    characterDiv.appendChild(occupationElement);

    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    characterDiv.appendChild(imageElement);

    container.appendChild(characterDiv);
  });
};
// Henter dataen, parser den og viser den i HTML
getData().then((data) => {
  const parsedData = parseData(data);
  renderDataToHTML(parsedData);
});
