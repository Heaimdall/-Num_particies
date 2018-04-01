"use strict";

const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
};

document.getElementById("btnDownload").onclick = () => {
    const canvas = document.getElementById("myCanvas"),
        dataURL = canvas.toDataURL('image/png');

    downloadURI(dataURL, 'new_image.png');
};