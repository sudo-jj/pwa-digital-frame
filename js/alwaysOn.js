const statusTxt = document.getElementsByClassName('status')[0];

const turnAlwaysOn = async () => {
    if ('wakeLock' in navigator) {
        try {
            const wakeLock = await navigator.wakeLock.request('screen');
            console.log(wakeLock);
        } catch (ex) {
            statusTxt.innerText += ex+'\r\n';
        }
    }else{
        statusTxt.innerText += 'no wakelock\r\n'
    }
}

turnAlwaysOn();
