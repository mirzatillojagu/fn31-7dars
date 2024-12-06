
const wrapper = document.querySelector("#wrapper");
const button = document.querySelector("#button");
const input = document.querySelector("#input");

document.addEventListener('DOMContentLoaded', () => {
    button.addEventListener("click", () => {
        const dateValue = input.value;

        if (!dateValue) {
            return;
        }

        const [year, month, day] = dateValue.split("-");
        const res = `http://numbersapi.com/${month}/${day}/date`;

        fetch(res)
            .then(response => response.text())
            .then(data => {
                wrapper.innerHTML  += `<p>${data}</p>`;
            })
            .catch(error => {
                console.error(error);
            });
    });
});



const temp = document.querySelector('#temp')
const wind = document.querySelector('#wind')
const humidity = document.querySelector('#humidity')
const button1 = document.querySelector('#button1')
const field = document.querySelector('#field')

const TOKEN = '78ba4c84dd2a43809ba122020240612'
const region = 'Ferghana'
document.addEventListener('DOMContentLoaded', function(){
    navigator.geolocation.getCurrentPosition((position) => {
        let region = position.coords.latitude + "," + position.coords.longitude
         fetch(`http://api.weatherapi.com/v1/current.json?key=${TOKEN}&q=Tashkent&aqi=${region}&aqi=no`,{
            method: 'GET'
         })
    
         .then(response => {
            if (response.status == 200) {
                return response.json()
            }
         })
         .then(data => {
           if (data.current) {
             temp.innerHTML = data.current.temp_c;
             wind.innerHTML = data.current.wind_kph;
             humidity.innerHTML = data.current.humidity;
           }
            
         })
         .catch(error => {
            console.log(error);
            
         })
        
    })
    
})


async function showTemp(region) {
    try{
       const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${TOKEN}&q=Tashkent&aqi=${region}&aqi=no`);
       const data = await response.json();
       return data;
       
    } catch (error){

    }
}


button && button1.addEventListener('click', function(){
    event.preventDefault();

    if (field.value) {
        showTemp(field.value)
        .then(data => {
            temp.innerHTML = data.current.temp_c;
            wind.innerHTML = data.current.wind_kph;
            humidity.innerHTML = data.current.humidity;
        })
        .catch(error => {
            console.log(error);
            
        })
    }
})
