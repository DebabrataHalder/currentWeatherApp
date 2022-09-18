const timeEl=document.getElementById("time");
const dateEl=document.getElementById("date");
const currentWeatherItemsEl= document.getElementById("current-weather-items")
const timeZone=document.getElementById("time-zone");
const countryEl=document.getElementById("country");
const weatherforecastEl=document.getElementById("weather-forecast");
const currentTempEl=document.getElementById("current-temp");

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec"];


const API_KEY='5542a25fa1924b8880dccd64987d529d'

setInterval(()=>{
  const time =new Date();
  const month=time.getMonth();
  const date =time.getDate();
  const day=time.getDay();
  const hour=time.getHours();
  const hoursIn24HrFormat=hour
  const minutes=time.getMinutes();
  
  timeEl.innerHTML=hoursIn24HrFormat +':'+(minutes<10?"0"+minutes:minutes);
  dateEl.innerHTML=days[day]+', '+months[month]+' '+ date
},1000) 

getWeatherData()

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success)=>{
    let {latitude, longitude}=success.coords;  



    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
    .then(res=>res.json()).then(data=>{

    
      showWeatherData(data);
    })
  });
}
function showWeatherData(data){
  let{humidity,pressure,temp_max,temp_min,temp}=data.main
  let{sunrise,sunset,country}=data.sys
  let {speed}=data.wind
  let{name}=data



  currentWeatherItemsEl.innerHTML=
  `
    <div class="weather-item">
      <div>Current Temperature</div>
      <div>${temp}°</div>
    </div>  

    <div class="weather-item">
      <div>Max Temperature</div>
      <div>${temp_max}°</div>
    </div>
    <div class="weather-item">
      <div>Min Temperature</div>
      <div>${temp_min}°</div>
    </div>
    <div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure}Kg</div>
    </div>
    <div class="weather-item">
      <div>Wind Speed</div>
      <div>${speed}Km/h</div>
    </div>
    <div class="weather-item">
      <div>SunRise</div>
      <div>${window.moment(sunrise*1000).format('HH:mm ')}hrs</div>
    </div>
    <div class="weather-item">
      <div>SunSet</div>
      <div>${window.moment(sunset*1000).format('HH:mm ')}hrs</div>
    </div>

  `
   document.getElementById("time-zone").innerHTML=name;
   document.getElementById("country").innerHTML=country;



}





