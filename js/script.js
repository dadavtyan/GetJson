let url = "https://jsonplaceholder.typicode.com/users";
let data = document.getElementById("data");

let map;
let marker;
let geoData = [];


function loadData(url) {

    return new Promise(function(resolve, reject) {

        let xml = new XMLHttpRequest();
        xml.open('GET', url, true);

        xml.onload = function() {
            if (this.status == 200) {
                let array = JSON.parse(this.responseText);
                resolve(array);
            }
        };

        xml.onerror = function() {
            reject(new Error("Network Error"));
        };

        xml.send();
    });

}

loadData(url)
    .then(
        response =>  createEl(response),
        error => console.log(error)
    );


function createEl(array) {

    for (let i = 0; i < array.length; i++) {
        let el = document.createElement("div");

        el.style.display = "none";
        el.className = "user";
        el.setAttribute("onmouseover", "mouseLog(this)");
        el.setAttribute("name", i);

        let elText = document.createTextNode(array[i].name);

        el.appendChild(elText);
        data.appendChild(el);
        geoData.push(array[i].address.geo);
    }
}

function myFunction() {
    let input = document.getElementById("search");
    let elName = document.querySelectorAll(".user");
    let text = input.value;


    for (let i = 0; i < elName.length; i++) {
        let checkText = elName[i].innerHTML.indexOf(text);
        if (text !== "") {
            if (checkText > -1) {
                elName[i].style.display = "block";
            } else {
                elName[i].style.display = "none";
            }
        } else {
            elName[i].style.display = "none";
        }

    }
}

function initMap() {
    let  myLatLng = {lat: -25.363, lng: 131.044};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
    });
}

function mouseLog(el) {
    let pos = el.getAttribute("name");
    let lat = geoData[pos].lat;
    let lng = geoData[pos].lng;
    setGeo(lat,lng);

}

function setGeo(lat, lng) {
    let geo = new google.maps.LatLng(lat, lng);
    map.setCenter(geo);
    marker.setPosition(geo);

}