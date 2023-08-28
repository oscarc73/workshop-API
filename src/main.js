const APIKey = '1415ffa916e6f0cf181777d3dbcc1eef';
const city = document.querySelector('#city');
const btnSearch = document.querySelector('#searchCity')
const sectionOne = document.querySelector('#one');
const sectionTwo = document.querySelector('#two');
const sectionThree = document.querySelector('#three');
const infoCity = document.querySelector('article');

//create info of city for section two div info.
const createInfo = (nameCity, stateCity, country, dataCount) => {
    console.log(country);
    infoCity.innerHTML = '';
    const pName = document.createElement('P');
    const pState = document.createElement('P');
    const pCountry = document.createElement('P');

    pName.classList.add('nameCity');
    pState.classList.add('nameState');
    pCountry.classList.add('nameCo');

    pName.innerHTML = `<b>Ciudad:</b> ${nameCity}`;
    pState.innerHTML = `<b>Provincia:</b> ${stateCity}`;
    pCountry.innerHTML = `<b>País:</b> ${country} <img src="https://flagcdn.com/40x30/${dataCount.toLowerCase()}.webp">`;

    infoCity.classList.add('col2')
    infoCity.append(pName, pState, pCountry)
}

//create box with info about temp section three
const createDivTemp = (temp, feelsTemp, humidity, weather, description, icon, nameCity) => {
    sectionThree.innerHTML = '';
    const divBox = document.createElement('div'); //box
    const divName = document.createElement('div'); //sect 1
    const divTemp = document.createElement('div'); //sect 2
    const divIcon = document.createElement('div'); //sect 3
    const divDesc = document.createElement('div'); //sect 4

    divBox.classList.add('box');
    divName.classList.add('sect1');
    divTemp.classList.add('sect2');
    divIcon.classList.add('sect3');
    divDesc.classList.add('sect4');

    const pTemp = document.createElement('p')
    const pFeelsT = document.createElement('p')
    const pHumi = document.createElement('p')
    const pWeather = document.createElement('p')
    const pDesc = document.createElement('p')
    const pIcon = document.createElement('img')
    const pName = document.createElement('P');

    pTemp.innerHTML = `${temp}°C`;
    //pFeelsT.textContent = feelsTemp;
    pHumi.innerHTML = `Humedad ${humidity}%`;
    pWeather.textContent = weather;
    pDesc.textContent = description;
    pIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    pName.textContent = nameCity

    divName.append(pName, pWeather);
    divTemp.appendChild(pTemp);
    divIcon.appendChild(pIcon);
    divDesc.append(pDesc, pHumi);

    divBox.append(divName, divTemp, divIcon, divDesc);
    sectionThree.appendChild(divBox)
}

//call API's
const callApis = () => {
    console.log('start function');
    const urlLocations = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${APIKey}`;

    //call attributes
    const fetchCityData = async () => {
        try {
            const response = await fetch(urlLocations);
            const data = await response.json();
            //console.log(data);
            const nameCity = data[0].name;
            const nameState = data[0].state;
            const dateCountry = data[0].country;
            const lat = data[0].lat; //latitude
            const lon = data[0].lon; //longitude

            //call name country
            const countryAPI = async (country) => {
                const urlApiCoun = `https://restcountries.com/v3.1/alpha/${country}`
                try {
                    const res = await fetch(urlApiCoun);
                    const data = await res.json()
                    console.log(data[0].altSpellings[0]);
                    const dataCount = data[0].altSpellings[0];
                    const nameC = data[0].name.common;

                    createInfo(nameCity, nameState, nameC, dataCount)
                } catch (error) {
                    console.error('Error:', error)
                }
            }
            countryAPI(dateCountry)

            //call weather
            const weather = async () => {
                const urlWaither = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=${APIKey}`;
                try {
                    const res = await fetch(urlWaither);
                    const data = await res.json();

                    const main = data.main;
                    const temp = Math.round(main.temp - 273.15);
                    const feelsTemp = Math.round(main.feels_like - 273.15);
                    const humidity = main.humidity;

                    const weatherData = data.weather;
                    const weather = weatherData[0].main;
                    const description = weatherData[0].description;
                    const icon = weatherData[0].icon;
                    console.log(weatherData[0].main);

                    createDivTemp(temp, feelsTemp, humidity, weather, description, icon, nameCity)
                } catch (error) {
                    console.log(error);
                }
            }
            weather()

        } catch (error) {
            infoCity.innerHTML = '';
            sectionThree.innerHTML = '';
            const p = document.createElement('p')
            p.classList.add('spanCity')
            infoCity.classList.add('col2')
            p.textContent = 'Ciudad invalidad, por favor ingresar una ciudad validad'
            infoCity.append(p)
        }
    }

    fetchCityData()
}

btnSearch.addEventListener('click', callApis)

/* const atributCity = () => {
    sectionTwo.innerHTML = ''
    console.log('se activa la funcion y limpia section');
    const urlLocations = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${APIKey}`;
    const pLat = document.createElement('p');
    const pLon = document.createElement('p');

    const latCity = async () => {
        const response = await fetch(urlLocations);
        const data = await response.json()
        console.log(data);
        console.log('lat OK');
        return lat = data[0].lat
    }
    
    const lonCity = async () => {
        const response = await fetch(urlLocations);
        const data = await response.json()
        console.og('lon OK');
        return lon = data[0].lon;
    }
    
    const propiesCity = async () => {
        await Promise.all([latCity(), lonCity()]);
        pLat.append(lat);
        pLon.append(lon);
        sectionTwo.append(pLat,pLon)
    }
    
    propiesCity()
} 

btnSearch.addEventListener('click', atributCity)
*/

/* const response = await fetch(urlLocations);
            const data = await response.json()
            console.log('data OK');
            return data[0];
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    const propiesCity = async () => {
        const data = await fetchCityData();

        if (data.length > 0) {
            sectionTwo.innerHTML = '';
            const pLat = document.createElement('p');
            const pLon = document.createElement('p');

            pLat.textContent = data.lat;
            pLon.textContent = data.lon;

            sectionTwo.append(pLat, pLon)
        } else {
            console.log('La ciudad no existe');
        }
    }

    propiesCity() */