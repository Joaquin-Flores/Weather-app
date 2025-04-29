async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;

    let city = cityInput;
    if (!city) {
        // Si no se proporciona una ciudad, obtenemos la ubicación por IP
        const geoData = await getGeoLocation();
        if (geoData && geoData.city) {
            city = geoData.city;
        } else {
            document.getElementById('weatherResult').innerHTML = "<p class='text-danger'>No se pudo determinar la ciudad automáticamente.</p>";
            return;
        }
    }

    const url = `https://wttr.in/${city}?format=j1`;

    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ciudad no encontrada');
        const data = await response.json();

        const condition = data.current_condition[0];

        weatherResult.innerHTML = `
            <h4>${city}</h4>
            <p>${condition.weatherDesc[0].value}</p>
            <h3>${condition.temp_C} °C</h3>
            <p>Humedad: ${condition.humidity}%</p>
            <p>Sensación Térmica: ${condition.FeelsLikeC} °C</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    }
}

// Función para obtener la ubicación por IP
async function getGeoLocation() {
    try {
        const response = await fetch('http://ip-api.com/json');
        if (!response.ok) throw new Error('No se pudo obtener la geolocalización');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
