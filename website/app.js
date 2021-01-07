/* Global Variables */
const
    apiURL      = 'http://api.openweathermap.org/data/2.5/forecast?zip=',
    apiKey      = ',us&appid=0d699f5298ce6c667b2a83f7971fd68f&units=metric',
    zipInp      = document.getElementById('zip'),
    dateDiv     = document.getElementById('date'),
    tempDiv     = document.getElementById('temp'),
    contentDiv  = document.getElementById('content'),
    feelingsInp = document.getElementById('feelings'),
    generateBtn = document.getElementById('generate'),
    handleError = error=>console.error('Error occurred:', error);

// Create a new date instance dynamically with JS
let date = new Date();
    date = `${(date.getMonth())+1}.${date.getDate()}.${date.getFullYear()}`;

generateBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    // Retrieve User Inputs.
    const
        zipVal  = zipInp.value,
        utxtVal = feelingsInp.value;
    // Fetch API Output & Store the data needed in server.
    getInfoByZip(apiURL,zipVal,apiKey).then(data=>{
        if(data.cod != 200) return alert(data.message);
        post('/data',{
            temp: data.list[0].main.temp,
            date: date,
            utxt: utxtVal,
        });
    }).catch(handleError)
});

// API information getter.
const getInfoByZip = async (url, zip, key)=>{
    const res = await fetch(url+zip+key);
    try {
        return await res.json();
    } catch (error) {
        console.error('Error occurred:', error);
        alert('Oops Something wrong check the console errors');
    }
};

// POST Handler Method.
const post = async (url='' , data={})=>{
    const res = await fetch(url, {
        method     : 'POST',
        credentials: 'same-origin',
        headers    : {
            'Content-Type': 'application/json'
        },
        body       : JSON.stringify(data)
    });
    try {
        await res.json().then(updateUI()).catch(handleError);
    } catch (error) {
        console.error('Error occurred:', error);
        alert('Oops Something wrong check the console errors');
    }
};

// UI Handler Method.
const updateUI = async ()=>{
    const req = await fetch('/all', {
        method     : 'GET',
        credentials: 'same-origin',
        headers    : {
            'Content-Type': 'application/json'
        }
    });
    try {
        // Update UI with the server stored API data.
        await req.json().then(data=>{
            dateDiv.innerHTML    = `Date: ${data.date}`;
            tempDiv.innerHTML    = `Temperature: ${data.temp}`;
            contentDiv.innerHTML = `Feelings: ${data.utxt}`;
        });
    } catch (error) {
        console.error('Error occurred:', error);
        alert('Oops Something wrong check the console errors');
    }
};