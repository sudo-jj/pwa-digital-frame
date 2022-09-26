const url = "homeassistant:1880/endpoint";
const socketurl = `ws://${url}/ws/`;
let connected = false;
let socket;


const connect = () => {
    if (!connected) {
        try {
            socket = new WebSocket(socketurl);

            socket.addEventListener('open', () => {
                console.log('open');
                connected = true;
            });

            socket.addEventListener('message', (evt) => {
                img = JSON.parse(evt.data);
                console.log(img);
                if (img.dataURL) {
                    loader.src = img.dataURL;
                }
            });

            socket.addEventListener('close', () => {
                connected = false;
            });



        } catch (err) {
            console.log(err);
            console.log('unable to connect.');
        }
    }

}

loader.addEventListener('load', (evt) => {
    console.log(evt.path[0].complete);
    container.style.backgroundImage = 'url(' + evt.path[0].src + ')';
});


setInterval(connect, 3000);







