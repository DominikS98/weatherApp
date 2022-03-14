const form = document.querySelector('#find-city form');

let find = {
    apiKey: '26a64326dd8dedbcbd5ce375146c0157',
    city: '',
    lat: '',
    lon: '',
    icon: '',
    description: '',
    mainTemp: '',
};

function faindCity() {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${find.city}&limit=1&appid=${find.apiKey}&lang=pl`;
    return fetch(url).then(respon => {
        return respon.json();
    });
}

function Wather() {
    const url2 = `http://api.openweathermap.org/data/2.5/weather?lat=${find.lat}&lon=${find.lon}&appid=${find.apiKey}&lang=pl`;
    return fetch(url2).then(respon => {

        return respon.json();
    });
}

async function whereIs() {
    find.city = document.getElementById('city').value;
    const whereIsCity = await faindCity();

    for (const city of whereIsCity) {
        find.lat = city.lat;
        find.lon = city.lon;
    }
    whatWather();
}

async function whatWather() {
    const whatW = await Wather();
    find.mainTemp = parseInt(whatW.main.temp - 273.15) + '&#8451';
    for (const wether of whatW.weather) {
        find.icon = wether.icon;
        find.description = wether.description;
    }
    UiChange();


}

function UiChange() {
    const today = new Date();
    const d = today.getDate();
    const m = today.getMonth();
    const y = today.getFullYear();
    const H = today.getHours();
    const mi = today.getMinutes();
    const s = today.getSeconds();

    const day = d + "/" + m + "/" + y;
    const time = H + ":" + mi + ":" + s;

    document.querySelector('#data').innerHTML = day;
    document.querySelector('#czas').innerHTML = time;
    document.querySelector('#miasto').innerHTML = find.city + " " + find.mainTemp;
    document.querySelector('#opis').innerHTML = find.description;
    document.querySelector('.img').src = `http://openweathermap.org/img/wn/${find.icon}.png`;

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    whereIs();


});