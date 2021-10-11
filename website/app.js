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

const updateUI = async () => {
    const request = await fetch(url);
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `<p> ${weatherContent.date}</p>`;
        document.getElementById('time').innerHTML = `<p> ${weatherContent.time}`;
        document.getElementById('location').innerHTML = `<p> ${weatherContent.location}`;
        document.getElementById('temp').innerHTML = `<p> ${weatherContent.temp}`;
        document.getElementById('wind').innerHTML = `<p> ${weatherContent.wind}`;
        document.getElementById('clouds').innerHTML = `<p> ${weatherContent.clouds}`;
        document.getElementById('myfeeling').innerHTML = `<p> ${weatherContent.myfeeling}`;

    }catch (error){
        console.log('error', error)
    }
}



const getContent = async (url='', data={}) => {
    const response = await fetch(url, {
        method:'post',
        credential: 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await response.json();
        return data
    } catch(error) {
        console.log('error', error);
    }
}

