const statusTxt = document.getElementsByClassName('status')[0];

const video = document.createElement('video');
const canvas = window.canvas = document.createElement('canvas');
const container = document.getElementsByClassName('container')[0];
canvas.width = video.width = 200;
canvas.height = video.height = 150;
const ctx = canvas.getContext('2d');

//document.body.append(canvas);
//document.body.append(video);

const redTHz = 430;
const greenTHz = 580;
const blueTHz = 670;

const constraints = {
    audio: false,
    video: {
        //facingMode: "user",
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
        let brightnessValue = photonCount();
        console.log(brightnessValue/maxPhoton);
        console.log(setBrightness(brightnessValue));
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

const photonCount = () => {
    let total = 0;
    let probability = 1;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (i = 0; i < img.data.length; i += 4) {
        if (Math.floor(Math.random() * probability) == 0) {
            total += (img.data[i] * redTHz);
            total += (img.data[i + 1] * greenTHz);
            total += (img.data[i + 2] * blueTHz);
        }
    }
    return total * probability;
}

const setBrightness = (bv) => {
    const b = Math.max(33, Math.floor((bv / maxPhoton) * 100));
    container.style.filter = 'brightness(' + b + '%)';
    return b;
}

const _getMaxPhotonCount = () => {
    let total = 0;
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            total += (255 * redTHz) + (255 * greenTHz) + (255 * blueTHz);
        }
    }
    return total;
}

const maxPhoton = _getMaxPhotonCount();


setInterval(getCameraFrame, 5 * 1000);
getCameraFrame();