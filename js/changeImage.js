const peer = new Peer({ debug: 3 });
let conn = null;
let connected = false;

peer.on('open', (id) => {
    conn = peer.connect('correct-horse');
    conn.on('open', onConnectionConnect);
});



peer.on('disconnected',(e) => {
    console.log(e);
    connected = false;
});

peer.on('close',(e)=> {
    console.log(e);
    connected = false;
})

peer.on('error',(e) => {
    console.log(e);
});

const onConnectionConnect = () => {
    connected = true;
    conn.on('data', onData);
    conn.on('disconnected',(e) => {
        console.log(e);
        connected = false;
    });
    
    conn.on('close',(e)=> {
        console.log(e);
        connected = false;
    })
    
    conn.on('error',(e) => {
        console.log(e);
    });
}

const checkConnection = () => {
    if(connected == false && conn != null) {
        console.log('attempting reconnect');
        conn.close();
        conn = peer.connect('correct-horse');
        conn.on('open', onConnectionConnect);
    }
}

const onData = (data) => {
    console.log(data);
    if(data.imageURL) {
        loader.src = data.imageURL;
    }
}

loader.addEventListener('load',(evt)=>{
    console.log(evt.path[0].complete);
    container.style.backgroundImage = 'url('+evt.path[0].src+')'
});

setInterval(checkConnection, 60000);

