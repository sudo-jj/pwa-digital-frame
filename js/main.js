const container = document.getElementsByClassName('container')[0];

window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./script.js');
    }
}