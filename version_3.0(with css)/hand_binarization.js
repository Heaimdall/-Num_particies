"use strict";

document.getElementById('myForthButton').onclick = () => {
    const canvas = document.getElementById("myCanvas"),
        canvasContext = canvas.getContext("2d");

    const imgPixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

    const minVal = document.getElementById('delta1').innerHTML;
    const maxVal = document.getElementById('delta2').innerHTML;

    for (let y = 0; y < imgPixels.height; y++) {
        for (let x = 0; x < imgPixels.width; x++) {
            let i = (y * 4) * imgPixels.width + x * 4;
            if ((imgPixels.data[i] >= minVal) && (imgPixels.data[i] <= maxVal)) {
                imgPixels.data[i] = 255;
                imgPixels.data[i + 1] = 255;
                imgPixels.data[i + 2] = 255;
                imgPixels.data[i + 3] = 255;
            } else {
                imgPixels.data[i] = 0;
                imgPixels.data[i + 1] = 0;
                imgPixels.data[i + 2] = 0;
                imgPixels.data[i + 3] = 255;
            }
        }
    }

    canvasContext.putImageData(imgPixels, 0, 0);
    const img = new Image();
    img.src = canvas.toDataURL();
    canvasContext.drawImage(img, 0, 0);
};
