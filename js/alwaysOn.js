const turnAlwaysOn = async () => {
    if ('wakeLock' in navigator) {
        try {
            const wakeLock = await navigator.wakeLock.request('screen');
        } catch (ex) {
        }
    }else{
    }
}

turnAlwaysOn();
