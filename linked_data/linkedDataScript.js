let height;
//Define the Wikidata SPARQL endpoint URL
const endpoint = 'https://query.wikidata.org/sparql';

function getFetch(url){
    fetch(url)
        .then(response => response.json())
        .then(json => {
            height = json.results.bindings[0].heightLabel.value;
        });
    return height;
}

function getEiffelTowerHeight(){
    //Define SPARQL query to retrieve the height of the Eiffel Tower (Q243)
    const eiffelTowerQuery =
          `SELECT ?heightLabel WHERE {
              wd:Q243 wdt:P2048 ?height.
              SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }}`;
    //Construct the URL for executing the SPARQL query for the Eiffel Tower
    const eiffelTowerUrl = endpoint + "?query=" + encodeURIComponent(eiffelTowerQuery) + "&format=json";

    //Fetch the height of the Eiffel Tower
    height = getFetch(eiffelTowerUrl);
    return height;
}

function getElephantHeight(){
    //Define SPARQL query to retrieve the height of the Elephant (Q7378)
    const elephantQuery = 
          `SELECT ?heightLabel WHERE {
              wd:Q7378 wdt:P2048 ?height.
              SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }}`;
    //Construct the URL for executing the SPARQL query for the Elephant
    const elephantUrl = endpoint + "?query=" + encodeURIComponent(elephantQuery) + "&format=json";
    
    //Fetch the height of the Elephant
    height = getFetch(elephantUrl);
    return height;
}