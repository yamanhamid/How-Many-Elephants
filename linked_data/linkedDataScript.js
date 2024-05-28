async function searchWikidata() {
    const searchTerm = document.getElementById('searchInput').value;

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(searchTerm)}&language=en&format=json&origin=*`;

    const response = await fetch(url);
    const data = await response.json();

    checkForAttributes(data.search);
}

async function checkForAttributes(results) {
    const resultsWithAttributes = [];

    for (const result of results) {
        const attributes = await fetchAttributes(result.id);
        if (Object.keys(attributes).length > 0) {
            resultsWithAttributes.push({
                label: result.label,
                id: result.id,
                description: result.description || 'No description available',
                ...attributes
            });
        }
    }

    displaySearchResults(resultsWithAttributes);
}

async function fetchAttributes(entityId) {
    const sparqlQuery = `
        SELECT ?height ?width ?length ?area ?volume ?mass ?speed ?duration WHERE {
            OPTIONAL { wd:${entityId} wdt:P2048 ?height. }
            OPTIONAL { wd:${entityId} wdt:P2049 ?width. }
            OPTIONAL { wd:${entityId} wdt:P2043 ?length. }
            OPTIONAL { wd:${entityId} wdt:P2046 ?area. }
            OPTIONAL { wd:${entityId} wdt:P2234 ?volume. }
            OPTIONAL { wd:${entityId} wdt:P2067 ?mass. }
            OPTIONAL { wd:${entityId} wdt:P2052 ?speed. }
            OPTIONAL { wd:${entityId} wdt:P2047 ?duration. }
        }
    `;
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;

    const response = await fetch(url);
    const data = await response.json();
    const bindings = data.results.bindings;

    const attributes = {};
    if (bindings.length > 0) {
        const binding = bindings[0];
        if (binding.height) attributes.height = binding.height.value;
        if (binding.width) attributes.width = binding.width.value;
        if (binding.length) attributes.length = binding.length.value;
        if (binding.area) attributes.area = binding.area.value;
        if (binding.volume) attributes.volume = binding.volume.value;
        if (binding.mass) attributes.mass = binding.mass.value;
        if (binding.speed) attributes.speed = binding.speed.value;
        if (binding.duration) attributes.duration = binding.duration.value;
    }

    return attributes;
}

function displaySearchResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsDiv.textContent = 'No results found with attribute information.';
        return;
    }

    const select = document.createElement('select');
    select.id = 'resultSelect';
    select.onchange = () => showAttributes(select.value, results);

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Choose an option';
    defaultOption.value = '';
    select.appendChild(defaultOption);

    results.forEach(result => {
        const option = document.createElement('option');
        option.textContent = `${result.label} - ${result.description}`;
        option.value = result.id;
        select.appendChild(option);
    });

    resultsDiv.appendChild(select);
}

function showAttributes(entityId, results) {
    const result = results.find(r => r.id === entityId);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous result

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

        if (attributes.length > 0) {
            resultDiv.textContent = `${result.label} - ${attributes.join(', ')}`;
        } else {
            resultDiv.textContent = `No attribute information available for ${result.label}.`;
        }
    }
}
