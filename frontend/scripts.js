// Function to switch between pages
function goToPage(pageId) {
  // Hide all pages
  const pages = document.getElementsByClassName('page');
  for (let i = 0; i < pages.length; i++) {
      pages[i].style.display = 'none';
  }
  // Show the selected page
  document.getElementById(pageId).style.display = 'block';

  // Reset input fields and outputs based on the selected page
  switch (pageId) {
      case 'reality':
          clearInput('reality-input');
          document.getElementById('reality-output').textContent = '';
          break;
      case 'conversion':
          clearInput('conversion-input');
          document.getElementById('conversion-output').textContent = '';
          break;
      case 'equivalent':
          clearInput('equivalent-input');
          document.getElementById('equivalent-output').textContent = '';
          break;
      default:
          break;
  }
}

// Placeholder functions for Reality Check and Conversion logic
function realityCheck() {
  // Get the input value from the prompt box
  const input = document.getElementById('reality-input').value;

  // Process the input value (if necessary)
  // For now, let's just display the input value as it is
  const processedValue = input;

  // Display the processed value in the output box
  document.getElementById('reality-output').textContent = processedValue;
}


function conversionFunction() {
  // Get the input value and selected units
  const inputValue = parseFloat(document.getElementById('conversion-input').value);
  const fromUnit = document.getElementById('conversion-from-unit').value;
  const toUnit = document.getElementById('conversion-to-unit').value;

  // Perform conversion
  let outputValue;
  let outputUnits;

  switch (fromUnit) {
      case 'hours':
          outputValue = convertHours(inputValue, toUnit);
          outputUnits = toUnit;
          break;
      case 'minutes':
          outputValue = convertMinutes(inputValue, toUnit);
          outputUnits = toUnit;
          break;
      case 'seconds':
          outputValue = convertSeconds(inputValue, toUnit);
          outputUnits = toUnit;
          break;
      case 'milliseconds':
          outputValue = convertMilliseconds(inputValue, toUnit);
          outputUnits = toUnit;
          break;
      default:
          outputValue = 'Invalid conversion';
          break;
  }

  // Format output value in a human-friendly way
  const formattedOutput = formatOutput(outputValue);

  // Update the output
  document.getElementById('conversion-output').textContent = `${formattedOutput} ${outputUnits}`;
}

function formatOutput(value, unit) {
  if (Math.abs(value) >= 1e6) {
      // Large values, use scientific notation
      return value.toExponential(2);
  } else if (Math.abs(value) >= 100) {
      // Values with many decimal places, round to 2 decimal places
      return value.toFixed(2);
  } else {
      // Values with fewer decimal places, format as hours, minutes, and seconds
      if (unit === 'hours') {
          const hours = Math.floor(value);
          const remainingMinutes = Math.floor((value - hours) * 60);
          const remainingSeconds = Math.round((value - hours - (remainingMinutes / 60)) * 3600);
          return `${hours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds`;
      } else if (unit === 'minutes') {
          const hours = Math.floor(value / 60);
          const remainingMinutes = Math.floor(value % 60);
          return `${hours} hours and ${remainingMinutes} minutes`;
      } else if (unit === 'seconds') {
          const hours = Math.floor(value / 3600);
          const remainingMinutes = Math.floor((value % 3600) / 60);
          const remainingSeconds = Math.round(value % 60);
          return `${hours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds`;
      } else if (unit === 'milliseconds') {
          const totalSeconds = value / 1000;
          const hours = Math.floor(totalSeconds / 3600);
          const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
          const remainingSeconds = Math.round(totalSeconds % 60);
          return `${hours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds`;
      } else {
          return value.toString();
      }
  }
}





function convertHours(value, toUnit) {
  // Convert hours to the specified unit
  switch (toUnit) {
      case 'hours':
          return value;
      case 'minutes':
          return value * 60;
      case 'seconds':
          return value * 3600;
      case 'milliseconds':
          return value * 3600000;
      default:
          return 'Invalid conversion';
  }
}

function convertMinutes(value, toUnit) {
  // Convert minutes to the specified unit
  switch (toUnit) {
      case 'hours':
          return value / 60;
      case 'minutes':
          return value;
      case 'seconds':
          return value * 60;
      case 'milliseconds':
          return value * 60000;
      default:
          return 'Invalid conversion';
  }
}

function convertSeconds(value, toUnit) {
  // Convert seconds to the specified unit
  switch (toUnit) {
      case 'hours':
          return value / 3600;
      case 'minutes':
          return value / 60;
      case 'seconds':
          return value;
      case 'milliseconds':
          return value * 1000;
      default:
          return 'Invalid conversion';
  }
}

function convertMilliseconds(value, toUnit) {
  // Convert milliseconds to the specified unit
  switch (toUnit) {
      case 'hours':
          return value / 3600000;
      case 'minutes':
          return value / 60000;
      case 'seconds':
          return value / 1000;
      case 'milliseconds':
          return value;
      default:
          return 'Invalid conversion';
  }
}



// Function to clear input fields
function clearInput(inputId, outputId) {
  document.getElementById(inputId).value = '';
  document.getElementById(outputId).textContent = '';
}

