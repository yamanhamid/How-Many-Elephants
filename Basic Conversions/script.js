function convertUnits() {
    var select = document.getElementById('conversionType');
    var conversionType = select.options[select.selectedIndex].value;
    var inputValue = document.getElementById('inputValue').value;
    var url = 'http://127.0.0.1:5000/convert/' + conversionType;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({[select.options[select.selectedIndex].getAttribute('data-param')]: parseFloat(inputValue)})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'Result: ' + Object.values(data)[0];
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to convert units');
    });
}
