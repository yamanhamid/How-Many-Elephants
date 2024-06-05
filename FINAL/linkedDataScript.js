let dimension = null;
let object = null;
let objValue1 = null;
let objValue2 = null;

function getSearchItems(selectedContainer, selectedSearch) {
    searchWikidata(selectedContainer, selectedSearch, null, true);
}

async function searchWikidata(selectedContainer, selectedSearch, geminiResponse, secondBox) {

    let searchTerm = null;
    let twoWords = null;
    

    if(secondBox == true){
        searchTerm = document.getElementById(selectedSearch).value;
    }
    else{
        twoWords = geminiResponse.split(", ");
        dimension = twoWords[0];
        object = twoWords[1];
        if(dimension != null && object != null && secondBox == false){
            searchTerm = object;
        }
        else{
            alert("Please ask a valid question");
        }
    }
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(searchTerm)}&language=en&format=json&origin=*`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Wikidata Search Response:", data);

        checkForAttributes(data.search, selectedContainer, secondBox, dimension);
    } catch (error) {
        console.error("Error fetching data from Wikidata:", error);
    }
}

async function checkForAttributes(results, selectedContainer, secondBox, dimension) {
    const resultsWithAttributes = [];

    for (const result of results) {
        const attributes = await fetchAttributes(result.id, secondBox, dimension);
        if (Object.keys(attributes).length > 0) {
            resultsWithAttributes.push({
                label: result.label,
                id: result.id,
                description: result.description || 'No description available',
                ...attributes
            });
        }
    }

    displaySearchResults(resultsWithAttributes, selectedContainer, secondBox);
}
async function fetchAttributes(entityId, secondBox, dimension) {
    const sparqlQuery = `
        SELECT ?height ?heightUnit ?heightConversion ?width ?widthUnit ?widthConversion ?length ?lengthUnit ?lengthConversion ?area ?areaUnit ?areaConversion ?volume ?volumeUnit ?volumeConversion ?mass ?massUnit ?massConversion ?speed ?speedUnit ?speedConversion ?duration ?durationUnit ?durationConversion WHERE {
            OPTIONAL { wd:${entityId} wdt:P2048 ?height. OPTIONAL { wd:${entityId} p:P2048 [ ps:P2048 ?height ; psv:P2048 [ wikibase:quantityUnit ?heightUnit ] ] } OPTIONAL { ?heightUnit wdt:P2370 ?heightConversion } }
            OPTIONAL { wd:${entityId} wdt:P2049 ?width. OPTIONAL { wd:${entityId} p:P2049 [ ps:P2049 ?width ; psv:P2049 [ wikibase:quantityUnit ?widthUnit ] ] } OPTIONAL { ?widthUnit wdt:P2370 ?widthConversion } }
            OPTIONAL { wd:${entityId} wdt:P2043 ?length. OPTIONAL { wd:${entityId} p:P2043 [ ps:P2043 ?length ; psv:P2043 [ wikibase:quantityUnit ?lengthUnit ] ] } OPTIONAL { ?lengthUnit wdt:P2370 ?lengthConversion } }
            OPTIONAL { wd:${entityId} wdt:P2046 ?area. OPTIONAL { wd:${entityId} p:P2046 [ ps:P2046 ?area ; psv:P2046 [ wikibase:quantityUnit ?areaUnit ] ] } OPTIONAL { ?areaUnit wdt:P2370 ?areaConversion } }
            OPTIONAL { wd:${entityId} wdt:P2234 ?volume. OPTIONAL { wd:${entityId} p:P2234 [ ps:P2234 ?volume ; psv:P2234 [ wikibase:quantityUnit ?volumeUnit ] ] } OPTIONAL { ?volumeUnit wdt:P2370 ?volumeConversion } }
            OPTIONAL { wd:${entityId} wdt:P2067 ?mass. OPTIONAL { wd:${entityId} p:P2067 [ ps:P2067 ?mass ; psv:P2067 [ wikibase:quantityUnit ?massUnit ] ] } OPTIONAL { ?massUnit wdt:P2370 ?massConversion } }
            OPTIONAL { wd:${entityId} wdt:P2052 ?speed. OPTIONAL { wd:${entityId} p:P2052 [ ps:P2052 ?speed ; psv:P2052 [ wikibase:quantityUnit ?speedUnit ] ] } OPTIONAL { ?speedUnit wdt:P2370 ?speedConversion } }
            OPTIONAL { wd:${entityId} wdt:P2047 ?duration. OPTIONAL { wd:${entityId} p:P2047 [ ps:P2047 ?duration ; psv:P2047 [ wikibase:quantityUnit ?durationUnit ] ] } OPTIONAL { ?durationUnit wdt:P2370 ?durationConversion } }
        }
    `;
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("SPARQL Query Response:", data);

        const bindings = data.results.bindings;
        const attributes = {};
        if (bindings.length > 0) {
            const binding = bindings[0];

            const convertToSI = (value, conversionFactor) => {
                return value && conversionFactor ? value * parseFloat(conversionFactor) : value;
            };
        
            if (binding.height) {
                const height = parseFloat(binding.height.value);
                const heightConversion = binding.heightConversion ? parseFloat(binding.heightConversion.value) : 1;
                const heightInSI = convertToSI(height, heightConversion);
                attributes.height = heightInSI; // Store as a pure number
                if (secondBox == false) {
                    objValue1 = heightInSI;
                } else {
                    objValue2 = heightInSI;
                }
            }
            if (binding.width) {
                const width = parseFloat(binding.width.value);
                const widthConversion = binding.widthConversion ? parseFloat(binding.widthConversion.value) : 1;
                const widthInSI = convertToSI(width, widthConversion);
                attributes.width = widthInSI; // Store as a pure number
            }
            if (binding.length) {
                const length = parseFloat(binding.length.value);
                const lengthConversion = binding.lengthConversion ? parseFloat(binding.lengthConversion.value) : 1;
                const lengthInSI = convertToSI(length, lengthConversion);
                attributes.length = lengthInSI; // Store as a pure number
            }
            if (binding.area) {
                const area = parseFloat(binding.area.value);
                const areaConversion = binding.areaConversion ? parseFloat(binding.areaConversion.value) : 1;
                const areaInSI = convertToSI(area, areaConversion);
                attributes.area = areaInSI; // Store as a pure number
            }
            if (binding.volume) {
                const volume = parseFloat(binding.volume.value);
                const volumeConversion = binding.volumeConversion ? parseFloat(binding.volumeConversion.value) : 1;
                const volumeInSI = convertToSI(volume, volumeConversion);
                attributes.volume = volumeInSI; // Store as a pure number
            }
            if (binding.mass) {
                const mass = parseFloat(binding.mass.value);
                const massConversion = binding.massConversion ? parseFloat(binding.massConversion.value) : 1;
                const massInSI = convertToSI(mass, massConversion);
                attributes.mass = massInSI; // Store as a pure number
            }
            if (binding.speed) {
                const speed = parseFloat(binding.speed.value);
                const speedConversion = binding.speedConversion ? parseFloat(binding.speedConversion.value) : 1;
                const speedInSI = convertToSI(speed, speedConversion);
                attributes.speed = speedInSI; // Store as a pure number
            }
            if (binding.duration) {
                const duration = parseFloat(binding.duration.value);
                const durationConversion = binding.durationConversion ? parseFloat(binding.durationConversion.value) : 1;
                const durationInSI = convertToSI(duration, durationConversion);
                attributes.duration = durationInSI; // Store as a pure number
            }
        }

        return attributes;
    } catch (error) {
        console.error("Error fetching attributes:", error);
        return {};
    }
}

function displaySearchResults(results, selectedContainer, isSecondBox) {
    const resultsDiv = document.getElementById(selectedContainer);
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsDiv.textContent = 'No results found with attribute information.';
        return;
    }

    const select = document.createElement('select');
    select.id = 'resultSelect';
    select.setAttribute('data-name', selectedContainer); // Store the name attribute

    select.onchange = () => handleSelection(select.value, results, isSecondBox, select.options[select.selectedIndex].getAttribute('data-label'));

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Choose an option';
    defaultOption.value = '';
    select.appendChild(defaultOption);

    results.forEach(result => {
        if (result[dimension]) {
            const option = document.createElement('option');
            option.textContent = `${result.label} - ${result.description}`; // Display label and description
            option.value = result.id;
            option.setAttribute('data-label', result.label); // Store only the label
            select.appendChild(option);
        }
    });

    resultsDiv.appendChild(select);
}



let selectedValue1 = null; // Global variable to store the selected value from the first box
let selectedValue2 = null; // Global variable to store the selected value from the second box
let selectedName1 = ''; // Global variable to store the name of the first box
let selectedName2 = ''; // Global variable to store the name of the second box

function handleSelection(entityId, results, isSecondBox, labelText) {
    const result = results.find(r => r.id === entityId);
    if (result) {
        let value;
        if (dimension) {
            value = result[dimension];
            if (isSecondBox) {
                selectedValue2 = value; // Store the selected value for the second box
                selectedName2 = labelText; // Store the label of the second box
            } else {
                selectedValue1 = value; // Store the selected value for the first box
                selectedName1 = labelText; // Store the label of the first box
            }
            //alert(`Selected ${dimension} value: ${value}`);
        } else {
            const attributes = [];
            if (result.height) attributes.push(`Height: ${result.height}`);
            if (result.width) attributes.push(`Width: ${result.width}`);
            if (result.length) attributes.push(`Length: ${result.length}`);
            if (result.area) attributes.push(`Area: ${result.area}`);
            if (result.volume) attributes.push(`Volume: ${result.volume}`);
            if (result.mass) attributes.push(`Mass: ${result.mass}`);
            if (result.speed) attributes.push(`Speed: ${result.speed}`);
            if (result.duration) attributes.push(`Duration: ${result.duration}`);

            const attributesString = attributes.join(', ');
            //alert(`Attributes for ${result.label}: ${attributesString}`);
        }
    }
}





function showAttributes(entityId, results) {
    const result = results.find(r => r.id === entityId);
    if (result) {
        const attributes = [];
        if (result.height) attributes.push(`Height: ${result.height}`);
        if (result.width) attributes.push(`Width: ${result.width}`);
        if (result.length) attributes.push(`Length: ${result.length}`);
        if (result.area) attributes.push(`Area: ${result.area}`);
        if (result.volume) attributes.push(`Volume: ${result.volume}`);
        if (result.mass) attributes.push(`Mass: ${result.mass}`);
        if (result.speed) attributes.push(`Speed: ${result.speed}`);
        if (result.duration) attributes.push(`Duration: ${result.duration}`);

        const attributesString = attributes.join(', ');
        //alert(`Attributes for ${result.label}: ${attributesString}`);
    }
}

function calcEquiv() {
    if (selectedValue1 === null) {
        alert("No value has been selected from the first box yet.");
        return;
    }

    if (selectedValue2 === null) {
        alert("No value has been selected from the second box yet.");
        return;
    }

    const ratio = selectedValue1 / selectedValue2;
    let ratioMessageIntro = "";
    let ratioMessage = "";
    const measurementType = dimension ? dimension : "measurement";

    // Format the ratio message
    if (ratio > 10) {
        const nearestWholeNumber = Math.floor(ratio);
        ratioMessageIntro = `That's equivalent to ${nearestWholeNumber} ${selectedName1}s IN ${selectedName2}s.\n\n`;
        ratioMessage = `The ratio of approximately ${nearestWholeNumber}:1 means that the ${measurementType} of one ${selectedName1} is equivalent to the ${measurementType} of about ${nearestWholeNumber} ${selectedName2}(s).\nIn other words, it would take around ${nearestWholeNumber} ${selectedName2}(s) to have a combined ${measurementType} equal to that of one ${selectedName1}.`;
    } else {
        ratioMessageIntro = `That's equivalent to ${ratio.toFixed(2)} ${selectedName1}s IN ${selectedName2}s.\n\n`;
        ratioMessage = `The ratio of approximately ${ratio.toFixed(2)}:1 means that the ${measurementType} of one ${selectedName1} is equivalent to the ${measurementType} of about ${ratio.toFixed(2)} ${selectedName2}(s).\nIn other words, it would take around ${ratio.toFixed(2)} ${selectedName2}(s) to have a combined ${measurementType} equal to that of one ${selectedName1}.`;
    }
    document.getElementById('equivalent-output').innerHTML = `${ratioMessageIntro} ${ratioMessage}`;

}

