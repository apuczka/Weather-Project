/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=[API_KEY]&units=metric';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const feelings = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    getCode(baseURL, zipCode, apiKey).then( (data) => 
    postData("/add", feelings, data))
    // const data = getCode(baseURL, zipCode, apiKey)
    // postData(baseURL, zipCode, apiKey, data)
    if (zipCode == "") {
        alert("Zip code must be filled in!!!")
        return false;
    }
}



const getCode = async (baseURL, code, key)=> {
    const res = await fetch(baseURL + code + key)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }

}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
 
const postData = async (URL, feelings, data) => {
    const postData = {
        temp: data.main.temp,
        date: newDate,
        content: feelings,

    }
    settings(URL, postData)
}
const settings = async (URL='',  data={}) => {
    
    const res = await fetch(URL, {
        method: 'POST' ,
        credetials: 'same orgin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        
    })
    return updateUI()

}

/* Update UI*/
const updateUI = async () => {
    const req = await fetch('/all')
    try{
        const allData = await req.json()
        // console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp + " °C"}`;
        document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
    }catch(error){
        console.log("error", error)
    }
}