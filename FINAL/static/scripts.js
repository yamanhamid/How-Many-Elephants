// Function to switch between pages
function goToPage(pageId) {
  const pages = document.getElementsByClassName('page');
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
  document.getElementById(pageId).style.display = 'block';
}

// Function to clear input fields
function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}

// Function to handle unit conversion
function convertUnits() {
  const inputValue = document.getElementById('conversion-input').value;
  const inputUnit = document.getElementById('input-unit').value;
  const outputUnit = document.getElementById('output-unit').value;
  const url = `/convert/${inputUnit}_to_${outputUnit}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: parseFloat(inputValue) })
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      document.getElementById('conversion-output').value = data.result;
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to convert units');
  });
}

// Function to get equivalent values
/*
function equivalentTo() {
  const inputValue = document.getElementById('equivalent-value').value;
  const inputUnit = document.getElementById('equivalent-input').value;
  const equivalentType = document.getElementById('equivalent-type').value;
  const url = 'http://127.0.0.1:5000/equivalent';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: parseFloat(inputValue),
      unit: inputUnit,
      equivalentType
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      document.getElementById('equivalent-output').value = data.result;
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to get equivalent');
  });
}
*/

// Function to perform reality check
function realityCheck() {
  const textResponse = document.getElementById('reality-output');
  const input = document.getElementById('reality-input').value;
  const logo = document.querySelector('nav img'); 
  const loadingBar = document.getElementById('loading-bar');
  const loadingProgress = document.getElementById('loading-progress');

  // Start spinning the logo
  logo.style.animation = 'spin 3s linear infinite'; 
  textResponse.textContent = ""; 

  fetch('http://127.0.0.1:5000/realitycheck', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: input })
  })
  .then(response => response.json())
  .then(data => {
    const geminiResponse = data.result;
    const formattedResponse = formatGeminiResponse(geminiResponse);
    textResponse.innerHTML = "HME's Assessment: " + formattedResponse;
  })
  .catch(error => {
    console.error('Error:', error);
    textResponse.textContent = "Error fetching data from the server.";
  })
  .finally(() => {
    // Stop spinning the logo and reset rotation
    logo.style.animation = 'none';
    logo.style.transform = 'rotate(0deg)'; 
  });
}

// Function to format the response
function formatGeminiResponse(text) {
  text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const lines = text.split('\n');

  const formattedText = lines.map(line => {
    if (line.trim().startsWith('*')) {
      return `<br>${line.trim().slice(1)}`;
    } else if (line.trim().startsWith('Comparison:')) {
      return `<br><b>Comparison:</b><br>${line.trim().slice(10)}`;
    } else if (line.trim().startsWith('Conclusion:')) {
      return `<br><b>Conclusion:</b><br>${line.trim().slice(10)}`;
    } else {
      return `<p>${line.trim()}</p>`;
    }
  }).join('');

  return formattedText;
}

const dalleEndpoint = 'https://api.openai.com/v1/images/generations';
const reqButton = document.getElementById('button-request');
const reqStatus = document.getElementById('request-status');
const key = '';

function imagine() {
  // Fetch DOM elements
  
  const input = document.getElementById('imagine-input').value;

  const reqBody = {
    "prompt": input,
    "n": 1,
    "size": "512x512",
    "model": "dall-e-2",
    "response_format": "url",
  };

  const imageResponse = document.getElementById('imagine-image');
  
  fetch(dalleEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify(reqBody)
  })
  .then(response => response.json())
  .then(json => addImages(json, prompt))
  .catch(error => {
    console.error('Error:', error);
    imageResponse.alt = "Error fetching data from the server.";
  });
}

function addImages(jsonData, prompt) {
  console.log(jsonData);

  // Handle a possible error response from the API
  if (jsonData.error)
  {
    reqStatus.innerHTML = 'ERROR: ' + jsonData.error.message;
    return;
  }
  
  // Parse the response object, deserialize the image data, 
  // and attach new images to the page.
  const container = document.getElementById('image-container');
  for (let i = 0; i < jsonData.data.length; i++) {
    let imgData = jsonData.data[i];
    let img = document.createElement('img');
    img.src = imgData.url;
    img.alt = `prompt: ${prompt}, revised_prompt: ${imgData.revised_prompt}`;
    container.prepend(img);
  }

  reqStatus.innerHTML = jsonData.data.length +' images received for "' + prompt + '"';
}

// Function to switch between modes (measurement or something) on the Equivalent page
function switchMode(mode) {
  const somethingSection = document.getElementById('something-in-something');
  const searchInputContainer = document.getElementById('search-input-container');
  const selectionContainer = document.getElementById('selection-container');
  const selectionContainer2 = document.getElementById('selection-container-2');
  const searchInputContainer2 = document.getElementById('search-input-container-2');
  const selectionBox = document.getElementById('selection-box');
  const selectionBox2 = document.getElementById('selection-box-2');
  const measurementSection = document.getElementById('measurement-in-something');
  const measurementSearchInputContainer = document.getElementById('measurement-search-input-container');
  const measurementSelectionContainer = document.getElementById('measurement-selection-container');
  const measurementSearchInputContainer2 = document.getElementById('measurement-search-input-container-2');
  const measurementSelectionContainer2 = document.getElementById('measurement-selection-container-2');

  if (mode === 'measurement') {
      somethingSection.style.display = 'none';
      searchInputContainer.style.display = 'none';
      selectionContainer.style.display = 'none';
      searchInputContainer2.style.display = 'none'; // Hide second search input container
      selectionContainer2.style.display = 'none'; // Hide second selection container
      selectionBox2.innerHTML = ''; // Clear options from second selection box

      // Show measurement section
      measurementSection.style.display = 'block';
      measurementSearchInputContainer.style.display = 'block';
      measurementSelectionContainer.style.display = 'none';
      measurementSearchInputContainer2.style.display = 'block';
      measurementSelectionContainer2.style.display = 'none';
  } else if (mode === 'something') {
      somethingSection.style.display = 'block';
      searchInputContainer.style.display = 'block';
      selectionContainer.style.display = 'none'; // Hide first selection container
      searchInputContainer2.style.display = 'block'; // Show second search input container
      selectionContainer2.style.display = 'none'; // Hide second selection container
      selectionBox2.innerHTML = selectionBox.innerHTML;

      // Hide measurement section
      measurementSection.style.display = 'none';
  }
}


function showSecondSearch() {
  document.getElementById('search-input-container-2').style.display = 'block';
  document.getElementById('selection-container-2').style.display = 'block';
}


// Function to handle the search
function search() {
  const smartInput = document.getElementById('smart-input').value;
  const selectionContainer = document.getElementById('selection-container');

  // Perform search
  // Put your stuff here
  
  // Show the selection box when search button is clicked
  selectionContainer.style.display = 'block';
}
