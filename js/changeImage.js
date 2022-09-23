let fileHandle = null;
let fileRef = null;
let lastModified = null;
let fileSize = null;

const fr = new FileReader();

fr.addEventListener("load", () => {
    container.style.backgroundImage = 'url('+fr.result+')';
}, false);

container.addEventListener('click', async (evt) => {
    if (!fileHandle) {
        const pickerOpts = {
            types: [
                {
                    description: 'Images',
                    accept: {
                        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
                    }
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false
        };
        fileHandle = await window.showOpenFilePicker(pickerOpts);
        console.log(fileHandle[0]);
        fileRef = await fileHandle[0].getFile();

    }
});

const checkForUpdate = async () => {
    if (fileHandle != null) {
        delete fileRef;
        fileRef = await fileHandle[0].getFile();
        console.log(fileRef);

        if (fileRef.lastModified != lastModified || fileSize != fileRef.size) {
            changeImage();
        }
        lastModified = fileRef.lastModified;
        fileSize = fileRef.size;
    }
}

const changeImage = () => {
    console.log(fr.readAsDataURL(fileRef));

    // container.style.backgroundImage = 'url()'
}

setInterval(checkForUpdate, 3000);