
const API_KEY: string = "9b0862d5e75ffd1d0c02e1035f538ffe";

type WeatherData = {
    main: {
        temp: number;
        humidity: number;
    };
    weather: { description: string }[];
    name: string;
};

type ErrorResponse = {
    message: string;
};

type ApiResponse = WeatherData | ErrorResponse;

const btn = document.getElementById("btn") as HTMLButtonElement;

btn.addEventListener("click", getWeather);

async function getWeather(): Promise<void> {
    const input = document.getElementById("cityInput") as HTMLInputElement;
    const resultDiv = document.getElementById("result") as HTMLDivElement;

    const city: string = input.value.trim();

    if (city === "") {
        resultDiv.innerHTML = "Enter city name first";
        return;
    }

    try {
        const url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            API_KEY +
            "&units=metric";

        const response = await fetch(url);

        const data: ApiResponse = await response.json();

        if ("main" in data && "weather" in data) {
            showWeather(data as WeatherData);
        } else {
            resultDiv.innerHTML = "City not found or error";
        }

    } catch (err) {
        resultDiv.innerHTML = "Network error or API problem";
    }
}

function showWeather(data: WeatherData): void {
    const resultDiv = document.getElementById("result") as HTMLDivElement;

    resultDiv.innerHTML =
        "<b>City:</b> " + data.name + "<br>" +
        "<b>Temperature:</b> " + data.main.temp + " °C<br>" +
        "<b>Humidity:</b> " + data.main.humidity + "%<br>" +
        "<b>Condition:</b> " + data.weather[0].description;
}
