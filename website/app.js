/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=a3a01efea177cd6f42cfac7a32ae9bfa';
let zipCode = document.getElementById('zip').value;


document.getElementById('generate').addEventListener('click',generateContent);

function generateContent () {

    if (zipCode != '') {
        let url = baseUrl+zipCode+apiKey; 
        getContent (url, weatherData)
        .then (updateUI())
    } else {
        return "Please enter valid zipcode"
    }
    
}
function weatherData (data) {
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    let feeling = document.getElementById('feelings');

    let weatherContent = {
        date: newDate,
        time: d.toLocaleTimeString(),
        location: data.name,
        temp: data.main.temp,
        wind: data.wind.speed,
        clouds: data.clouds.all,
        myfeeling: feeling.value

    }
}

const getContent = async (url) => {
    const res = await fetch(url)

    try{
        const data = await res.json();
        console.log(data)
    } catch(error) {
        console.log('error', error);
    }
     
}