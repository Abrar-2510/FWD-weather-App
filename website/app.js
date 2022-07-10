/* Global Variables */
const dateElement= document.getElementById("date");
const tempElement= document.getElementById("temp");
const contentElement= document.getElementById("content");
const cityElement = document.getElementById("city");
let generateBtn = document.querySelector('#generate')
let d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// current month
let month = months[d.getMonth()]; 
// custom current date
let currentDate = `${d.getDate()} ${month} ${d.getFullYear()}`; 
// Custom Current Time Format
// let currentDate = d.toDateString();
let currentTime = d.toLocaleTimeString();
// base url
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// api key
let apiKey = '&appid=7d18c491dbc0d451d33a26ee4d0c1c53&units=metric';
// url to server
let serverURL = "http://localhost:4555/allData";
/* Function called by event listener */

generateBtn.addEventListener('click', (event) => {
  let ZipElement = document.querySelector('#zip').value;
  let content = document.querySelector('#feelings').value;
  // check the validation of zip code
  if ((ZipElement.length < 5) || (isNaN(ZipElement))) {
     alert("check zip code")
     } 
     else {
  getWeather(baseURL, ZipElement, apiKey).then((inputData) => {
      //console.log(inoutdata);
      let info=  {
        date: currentDate,
        temp: Math.round(inputData.main.temp),// to get integer number
        // city: inputData.city.name, 
        content,
        
      };
      postdata('/addData', info);
    })
      UIgenerated();
      document.getElementById('entry').style.opacity = 1;
  }});
/* Function called by event listener */
const UIgenerated = async () => {
  const request = await fetch(serverURL);
  try {
    const myData = await request.json();
    // cityElement.innerHTML = 'City: ' + myData.city;
    dateElement.innerHTML = 'The Date is : ' + myData.date;
    tempElement.innerHTML = 'Temperature now is : ' + Math.round(myData.temp) + '&degC'; 
    contentElement.innerHTML = 'Your feeling is : ' + myData.content; 
  }
  catch (err) {
    console.log(`Error: ${err}`);
  }
};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, ZipElement, apiKey) => {
  const res = await fetch(baseURL + ZipElement + apiKey);
  if (res.status === 404 || res.status === 400) {
    contentElement.innerHTML =
      "zip code not valid";
  }
    // turned into JSON
  try {
    const inputdata = await res.json();
    return inputdata;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
/* Function to POST data */
const postdata = async (url = '', dataUpdated = {}) => {
  // console.log(dataUpdated);
  const request = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // omit
    headers: {
       // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json' 
    },
    // Convert the input data of zip and feeling into a string for server
    body: JSON.stringify(dataUpdated)
  })

  try {
    const dataUpdated = await request.json();
    return dataUpdated;
  }
  catch (err) {
    console.log(`Error: ${err}`);
  }
};

