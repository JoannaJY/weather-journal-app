

/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',au&units=metric&appid=a3a01efea177cd6f42cfac7a32ae9bfa';

document.getElementById('generate').addEventListener('click',generateContent);

function generateContent () {
    let zipCode = document.getElementById('zip').value;
    console.log('clicked' + zipCode);
    if (zipCode != '') {
        let url = baseUrl+zipCode+apiKey; 
        getContent (url, weatherData)
       
    } else {

        return "Please enter valid zipcode"
    }
    
}

function weatherData (data) {
    console.log('weather data');
    let d = new Date();
    let feeling = document.getElementById('feelings');

    let weatherContent = {
        date: d.toLocaleDateString(),
        time: d.toLocaleTimeString(),
        location: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        wind: data.wind.speed,
        clouds: data.clouds.all,
        myfeeling: feeling.value

    }
    postWeather('/newEntry', weatherContent)
    .then(updateUI ());
}

const updateUI = async () => {
    console.log('updateUI')
    let base = 'http://localhost:8000'
    const request = await fetch(base+'/getAllData');
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `<p> ${allData.date} </P>`;
        document.getElementById('time').innerHTML = `<p> ${allData.time} </p>`;
        document.getElementById('location').innerHTML = `${allData.location}`;
        document.getElementById('temp').innerHTML = `<p> Temperature ${allData.temp} &#8451;</p>`;
        document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + allData.icon +"@2x.png";
        document.getElementById('wind').innerHTML = `<p> Wind Speed ${allData.wind} mph </p>`;
        document.getElementById('clouds').innerHTML = `<p> Cloudiness ${allData.clouds} %</p>`;
        document.getElementById('myfeeling').innerHTML = `<p> Feeling: ${allData.myfeeling} </p>`;

    }catch (error){
        console.log('error', error)
    }
}



const postWeather = async (url, data) => {
    let base = 'http://localhost:8000'
    const response = await fetch(base + url, {
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

const  getContent = async (url='',a) => {
    console.log('get content '+url);
    const request = await fetch(url);
    try {
        const abc = await request.json()
        console.log(abc);
        a(abc);
    } catch (error){
        console.log('error',error)
    }
}
