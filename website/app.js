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


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values
  const ZipElement = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeather(baseURL, ZipElement, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { 
        date: newDate,
        temp: userData.main.temp, 
        content
     })
    }).then(function (dataUpdated) {
      // call UIgenerated to update browser content
      UIgenerated()
    })
  // reset form
  form.reset();
}
/* Function called by event listener */
const UIgenerated = async () => {
    const request = await fetch('/all');
    try {
      const myData = await request.json()
      // show icons on the page
      icons.forEach(icon => icon.style.opacity = '1');
      // update new entry values
      dateElement.innerHTML = 'The Date is : ' + myData.date;
      tempElement.innerHTML = 'Temperature now is : ' + Math.round(myData.temp) + '&degC'; 
      contentElement.innerHTML = 'Your feeling is : ' + myData.content;
    }
    catch (error) {
        // catch any errors
      console.log("error", error);
    }
  };

/* Function to GET Web API Data*/
const getWeather = async (baseURL, ZipElement, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + ZipElement + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const dataUpdated = await req.json();
    return dataUpdated;
  }
  catch (error) {
    console.log(error);
    //catch any errors
  }
};

