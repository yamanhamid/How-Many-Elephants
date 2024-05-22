function goToPage(pageId) {
  // Hide all pages
  const pages = document.getElementsByClassName('page');
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none'; 
  }
  // Show the selected page
  document.getElementById(pageId).style.display = 'block';
}

function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}

function convertUnits() {
  const inputValue = document.getElementById('conversion-input').value;
  const inputUnit = document.getElementById('input-unit').value;
  const outputUnit = document.getElementById('output-unit').value;
  const url = `http://127.0.0.1:5000/convert/${inputUnit}_to_${outputUnit}`;

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

function realityCheck() {
  const textResponse = document.getElementById('reality-output');
  
  const input = document.getElementById('reality-input').value;
  fetch('http://127.0.0.1:5000/realitycheck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input })
  })
  .then(response => response.json())
  .then(data => {
      let geminiResponse = data.result;
      let formattedResponse = formatGeminiResponse(geminiResponse); 
      textResponse.innerHTML = "HME's Assessment: " + formattedResponse;
  })
  .catch(error => {
      console.error('Error:', error);
      textResponse.textContent = "Error fetching data from the server.";
  });
}

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