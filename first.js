let inputDevice = document.querySelector(".int");
let searchBtn = document.querySelector(".btn");
let cityName = document.querySelector("#city-name");
let temperature = document.querySelector("#temp");
let weatherCond = document.querySelector("#weather-condition");
let weatherIcon = document.querySelector("#weather-icon");

searchBtn.addEventListener("click",()=>{
    let userInput = inputDevice.value;

    if(userInput.trim() ===""){
        alert("Please Enter City's Name");
        return;
    }
    getInfo(userInput);
    inputDevice.value = "";
});
    const getInfo= async(userInput)=>{
        try{
            cityName.innerText = "Loading...";
            temperature.innerText = "";
            weatherCond.innerText = "";
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=af70c432892fe3d645e7ef8480f13996&units=metric`);
            let data = await response.json();
            console.log(data);
            if(data.cod === "404"){
        alert("City not found");
        return;
      }
      cityName.innerText ="City Name: " + data.name;
      temperature.innerText = `${data.main.temp}°C (Feels like ${data.main.feels_like}°C)`;
      weatherCond.innerText = data.weather[0].description.toUpperCase();
      //icons
      let iconCode = data.weather[0].icon;
      weatherIcon.src=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      //background-change
      let condition = data.weather[0].main;

if (condition === "Clear") {
  document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
}
else if (condition === "Clouds") {
  document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
}
else if (condition === "Rain") {
  document.body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
}
else if (condition === "Thunderstorm") {
  document.body.style.background = "linear-gradient(to right, #141e30, #243b55)";
}
else if (condition === "Mist" || condition === "Haze") {
  document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
}

    } catch (error){
        console.log(error);
        alert("something went wrong");
    }
   
};

