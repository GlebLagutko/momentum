const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    date = document.querySelector('.date');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const btnImg = document.querySelector('.btn');
let changeImgWithBtn = false;

const daysOfTheWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
}

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',

}

const baseMorning = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/morning/'
const baseAfternoon = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/day/'
const baseEvening = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/evening/'
const baseNight = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/night/'
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'];
let allImages = [];
let previousHour = -1;

function showDate() {
    let today = new Date(),
        day = today.getDay(),
        dateOfMonth = today.getDate(),
        month = today.getMonth();
    date.innerHTML = `${getDay(day)}<span>, </span>${dateOfMonth}<span> </span>${getMonth(month)} `;
    setTimeout(showTime, 1000);

}

function getDay(n) {
    return daysOfTheWeek[n];
}

function getMonth(n) {
    return months[n];
}

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();


    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} `;

    setTimeout(showTime, 1000);
}


function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function shuffleImages() {
    shuffle(images);
    allImages = [];
    for (const image of images) {
        allImages.push(`${baseMorning}image`);
    }
    for (const image of images) {
        allImages.push(`${baseAfternoon}image`);
    }
    for (const image of images) {
        allImages.push(`${baseEvening}image`);
    }
    for (const image of images) {
        allImages.push(`${baseNight}image`);
    }
}


function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();
    shuffleImages();
    if (previousHour - hour !== 0) {
        if (hour < 12 && hour >= 6) {
            let number = hour - 6;
            document.body.style.backgroundImage =
                `url('${baseMorning}${images[number]}')`;
            greeting.textContent = 'Good Morning, ';
        } else if (hour < 18 && hour >= 12) {

            let number = hour - 12;
            document.body.style.backgroundImage =
                `url('${baseAfternoon}${images[number]}')`;
            greeting.textContent = 'Good Afternoon, ';
        } else if (hour >= 18 && hour < 24) {

            let number = hour - 18;
            document.body.style.backgroundImage =
                `url('${baseEvening}${images[number]}')`;
            greeting.textContent = 'Good Evening, ';

            document.body.style.color = 'white';
        } else {
            let number = 6 - hour;
            document.body.style.backgroundImage =
                `url('${baseNight}${images[number]}')`;
            greeting.textContent = 'Good Night, ';
            document.body.style.color = 'white';
        }

    }
    previousHour = hour;
    setTimeout(setBgGreet, 1000)
}


function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}


function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}


function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}


function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=en&appid=da9c9689fa19ac3ed3a29bbd3670acdc&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    wind.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity} %`;
    weatherDescription.textContent = data.weather[0].description;

}

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function () {
        btnImg.disabled = false
    }, 1000);
}

btnImg.addEventListener('click', getImage);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

getWeather();
showTime();
showDate();
shuffleImages();
setBgGreet();
getName();
getFocus();