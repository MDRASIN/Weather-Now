## 💻 Code Explanation – Weather Now

This project consists mainly of three important files: **`App.jsx`**, **`weatherService.js`**, and **`style.css`**.  
Each of these files plays a key role in making the weather app function smoothly and look good.

---

### 🧩 1. `App.jsx`
- This is the **main React component** of the application.  
- It manages user input (city name), handles API requests, and displays weather data on the screen.  
- Uses React **`useState`** for managing data such as:
  - `weatherData` → stores current weather details.  
  - `forecastData` → stores upcoming days’ forecast.  
  - `city` → tracks user input.  
- When the user clicks **Get Weather**, it triggers a function that fetches data from `weatherService.js`.  
- It then updates the UI dynamically without reloading the page.  
- Also contains the JSX structure — input field, button, and weather display cards.

---

### 🌤️ 2. `weatherService.js`
- This file handles the **API integration**.  
- It uses the **Open-Meteo API** to fetch weather information based on the city name.  
- It performs two key actions:
  1. Converts the city name to latitude and longitude (using Open-Meteo’s geocoding service).  
  2. Fetches temperature, wind speed, humidity, and forecast data for those coordinates.  
- All the API logic is written separately here to keep `App.jsx` clean and modular.  
- The functions inside return processed JSON data that `App.jsx` can easily use.

---

### 🎨 3. `style.css`
- This file defines the **visual design** of the app.  
- It includes styling for:
  - The input field and search button  
  - Weather cards layout and animation  
  - Responsive design adjustments for different screen sizes  
- The design is minimal, clean, and mobile-friendly.  
- It ensures the app looks consistent and easy to read across devices.

---

### ⚙️ Code Flow Summary
1. User types a city name → clicks “Get Weather”.  
2. `App.jsx` calls a function from `weatherService.js`.  
3. The function fetches real-time weather data from **Open-Meteo API**.  
4. The returned data is displayed dynamically on the UI using React state updates.  
5. Styling from `style.css` ensures everything is neatly presented.
