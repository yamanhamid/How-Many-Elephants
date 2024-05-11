function showRealityCheck() {
    document.getElementById('result').textContent = "This is a reality check.";
}

function showBasicConversion() {
    const inputHeight = document.getElementById('inputHeight').value;
    const basicConversionResult = `Basic conversion: ${inputHeight} cm = ${inputHeight / 100} m`;
    document.getElementById('result').textContent = basicConversionResult;
}

function showEquivalentTo() {
    document.getElementById('equivalentToOptions').style.display = 'block';
}

function showHeight() {
    let heightGotten;
    const selectedOption = document.getElementById('entityOptions').value;
    if (selectedOption === 'elephant') {
        heightGotten = getElephantHeight();
        document.getElementById('result').textContent = heightGotten;
    }
    else if (selectedOption === 'eiffelTower') {
        heightGotten = getEiffelTowerHeight();
        document.getElementById('result').textContent = heightGotten;
    } 
    else {
        document.getElementById('result').textContent = "Please choose an option";
    }
}
