"use strict";

document.getElementById('myButton').onclick = () => {
    const canvas = document.getElementById("myCanvas"),
        canvasContext = canvas.getContext("2d");

    const imgPixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < imgPixels.height; y++) {
        for (let x = 0; x < imgPixels.width; x++) {
            const i = (y * 4) * imgPixels.width + x * 4;
            const avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;

            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
            imgPixels.data[i + 3] = 255;
        }
    }

    canvasContext.putImageData(imgPixels, 0, 0);
    const img = new Image();
    img.src = canvas.toDataURL();
    canvasContext.drawImage(img, 0, 0);
};
