/* Navigation Bar Styling */
nav {
  background-color: #2F3C7E; /* Blue */
  color: white;
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav img {
  width: 120px;
  margin-bottom: 20px;
  border-radius: 50%; /* Rounded image */
  animation: spin 5s linear infinite; /* Spinning animation */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

nav button {
  background-color: #FBEAEB; /* Pastel Pink */
  border: none;
  color: #2F3C7E; /* Blue */
  padding: 10px;
  text-align: center;
  width: 80%;
  margin-bottom: 30px; /* Decreased margin */
  font-size: 14px;
  border-radius: 25px;
  cursor: pointer;
  flex-grow: 1;
  transition: background-color 0.3s;
  animation: glowing 1300ms infinite;
}

@keyframes glowing {
  0% {
    background-color: #FFD3E0; /* Lighter shade of Pastel Pink */
    box-shadow: 0 0 5px #FFD3E0; /* Lighter shade of Pastel Pink */
  }
  50% {
    background-color: #FBEAEB; /* Pastel Pink */
    box-shadow: 0 0 20px #FBEAEB; /* Pastel Pink */
  }
  100% {
    background-color: #FFD3E0; /* Lighter shade of Pastel Pink */
    box-shadow: 0 0 5px #FFD3E0; /* Lighter shade of Pastel Pink */
  }
}

nav button:hover {
  background-color: #F8C8D7; /* Darker Pastel Pink */
}

/* Page Content Styling */
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #FBEAEB; /* Pastel Pink */
  margin: 0;
  padding: 0;
}

html {
  overflow: hidden;
}

.page {
  text-align: center;
  margin-left: 250px;
  padding: 20px;
  min-height: 100vh; /* Ensure the page fills the viewport */
  border-radius: 25px; /* Rounded corners */
  background-color: #FFFFFF; /* White background */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

#home {
  background-color: #FBEAEB; /* Pastel Pink */
}

#reality {
  background-color: #FFD3E0; /* Light Pink */
}

#conversion {
  background-color: #D8E2F0; /* Light Blue */
}

#equivalent {
  background-color: #C9F1FF; /* Light Cyan */
}

.input-container {
  padding-bottom: 20px; /* Increased padding */
}

.output-container {
  padding-bottom: 20px; /* Increased padding */
}

.button-container {
  padding-bottom: 20px; /* Increased padding */
}

input, textarea, select {
  width: calc(100% - 40px); /* Adjusted width */
  max-width: 500px; /* Added max-width */
  margin-bottom: 20px; /* Increased margin */
  border-radius: 15px; /* Rounded corners */
  border: 1px solid #ccc; /* Light border */
  padding: 10px; /* Increased padding */
  transition: border-color 0.3s;
}

input:focus, textarea:focus, select:focus {
  border-color: #6a4c93; /* Dark Purple on focus */
}

textarea[readonly] {
  height: 300px;
}

button {
  background-color: #6a4c93; /* Dark Purple */
  border: none;
  color: white;
  padding: 10px 20px;
  margin-bottom: 20px; /* Increased margin */
  font-size: 14px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #553c7b; /* Darker Purple */
}

/* Equivalent Page Specific Styles */
.page#equivalent {
  text-align: center;
}

.page#equivalent .button-container {
  margin-top: 50px;
}

.page#equivalent .button-container button {
  background-color: #6a4c93; /* Dark Purple */
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.page#equivalent .button-container button:hover {
  background-color: #553c7b; /* Darker Purple */
}
