var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const API_KEY = "9b0862d5e75ffd1d0c02e1035f538ffe";
const btn = document.getElementById("btn");
btn.addEventListener("click", getWeather);
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const input = document.getElementById("cityInput");
        const resultDiv = document.getElementById("result");
        const city = input.value.trim();
        if (city === "") {
            resultDiv.innerHTML = "Enter city name first";
            return;
        }
        try {
            const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&appid=" +
                API_KEY +
                "&units=metric";
            const response = yield fetch(url);
            const data = yield response.json();
            if ("main" in data && "weather" in data) {
                showWeather(data);
            }
            else {
                resultDiv.innerHTML = "City not found or error";
            }
        }
        catch (err) {
            resultDiv.innerHTML = "Network error or API problem";
        }
    });
}
function showWeather(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML =
        "<b>City:</b> " + data.name + "<br>" +
            "<b>Temperature:</b> " + data.main.temp + " °C<br>" +
            "<b>Humidity:</b> " + data.main.humidity + "%<br>" +
            "<b>Condition:</b> " + data.weather[0].description;
}
