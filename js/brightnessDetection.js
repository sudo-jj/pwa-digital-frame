const statusTxt = document.getElementsByClassName('status')[0];

const video = document.createElement('video');
const canvas = window.canvas = document.createElement('canvas');

canvas.width = video.width = 200;
canvas.height = video.height = 150;
const ctx = canvas.getContext('2d');

//document.body.append(canvas);
//document.body.append(video);

const constraints = {
    audio: false,
    video: {
        facingMode: { exact: "environment" },
        width: { ideal: video.width },
        height: { ideal: video.height },
        frameRate: { ideal: 60 }
    }
}

const handleError = (error) => {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}


const handleSuccess = (stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
        video.play();
    }

    setTimeout(() => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let brightnessValue = rgbToLux();
        console.log(brightnessValue);
        setBrightness(brightnessValue)
        stopStream(stream);
    }, 2000);



    //  statusTxt.innerText += brightnessValue+' ';




    //  stopStream(stream);
}

const getCameraFrame = () => {
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}

const stopStream = (stream) => {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
}

const rgbToLux = () => {
    let r = 0;
    let g = 0;
    let b = 0;
    let t = 0;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (i = 0; i < img.data.length; i += 4) {
        r += img.data[i];
        g += img.data[i + 1];
        b += img.data[i + 2];
        t += 1;
    }
    return 179 * ((r / t * .265) + (g / t * .67) + (b / t * .065));
}

//taken from https://www.maximintegrated.com/en/design/technical-documents/app-notes/4/4913.html  
const setBrightness = (lux) => {

    const b = Math.min(100, 9.9323 * Math.log(lux) + 27.059);
    container.style.filter = 'brightness(' + b + '%)';
    return b;
}


setInterval(getCameraFrame, 60 * 1000);
getCameraFrame();