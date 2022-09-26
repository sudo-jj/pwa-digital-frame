const container = document.getElementsByClassName('container')[0];
const loader = document.getElementsByClassName('loader')[0];


window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./script.js');
    }
    document.querySelector("body").requestFullscreen();
}