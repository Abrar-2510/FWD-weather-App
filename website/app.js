/* Global Variables */
const dateElement= document.getElementById("date");
const tempElement= document.getElementById("temp");
const contentElement= document.getElementById("content");
const form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');
let d = new Date();
// let newDate = d.toDateString();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let newDate =  months[d.getMonth()] +' / '+ d.getDate() +' / '+ d.getFullYear();
// base url
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// api key
let apiKey = '&appid=7d18c491dbc0d451d33a26ee4d0c1c53&units=metric';

/* Function called by event listener */
document.getElementById('generate').addEventListener('click', () => {
  const ZipElement = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  getWeather(baseURL, ZipElement, apiKey)
    .then(function (inputData) {
      postData('/addData', { 
        date: newDate,
        temp: inputData.main.temp, 
        content
     })
    }).then(function (dataUpdated) {
      // call UIgenerated to update browser content
      UIgenerated()
    })
  // reset form
  form.reset();
});


/* Function to GET Web API Data*/
const getWeather = async (baseURL, ZipElement, apiKey) => {
  const responses = await fetch(baseURL + ZipElement + apiKey);
   // turned into JSON
  try {
    const inputData = await responses.json();
    return inputData;
  } catch (error) {
    console.log("error: ", error);
  }
}

/* Function to POST data */
const postData = async (url = '', dataUpdated = {}) => {
  // console.log(dataUpdated);
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdated)
  })

  try {
    const dataUpdated = await request.json();
    return dataUpdated;
  }
  catch (error) {
    console.log(error);
    //catch any errors
  }
};

/* Function called by event listener */
const UIgenerated = async () => {
  const request = await fetch('/allData');
  try {
    const myData = await request.json();
    dateElement.innerHTML = 'The Date is : ' + myData.date;
    tempElement.innerHTML = 'Temperature now is : ' + Math.round(myData.temp) + '&degC'; 
    contentElement.innerHTML = 'Your feeling is : ' + myData.content;
  }
  catch (error) {
      // catch any errors
    console.log("error", error);
  }
};