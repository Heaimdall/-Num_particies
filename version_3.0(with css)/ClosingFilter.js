"use strict";

document.getElementById('myEighthButton').onclick = () => {
    let x;
    let y;
    let i;
    let min, max;
    const canvas = document.getElementById("myCanvas"),
        canvasContext = canvas.getContext("2d");

    const imgPixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

    const NewTable = new Array(imgPixels.height);

    for (i = 0; i < NewTable.length; i++) {
        NewTable[i] = new Array(imgPixels.width);
    }


    for (y = 0; y < imgPixels.height; y++) {
        for (x = 0; x < imgPixels.width; x++) {
            NewTable[y][x] = 0;
            min = 5000;
            for (let n = -1; n < 2; n++) {
                for (let m = -1; m < 2; m++) {
                    let a = 0, b = 0;
                    if (y + n < 0) a = -1 * (y + n);
                    else a = (y + n);
                    if (y + n >= imgPixels.height) a = y - n;
                    else a = (y + n);
                    if (x + m < 0) b = -1 * (x + m);
                    else b = (x + m);
                    if (x + m >= imgPixels.width) b = x - m;
                    else b = (x + m);
                    i = (a * 4) * imgPixels.width + b * 4;
                    i = Math.round(i);
                    if (imgPixels.data[i] < min)
                        min = imgPixels.data[i];
                }
            }
            NewTable[y][x] = min;
        }
    }


    for (y = 0; y < imgPixels.height; y++) {
        for (x = 0; x < imgPixels.width; x++) {
            i = (y * 4) * imgPixels.width + x * 4;
            imgPixels.data[i] = NewTable[y][x];
            imgPixels.data[i + 1] = NewTable[y][x];
            imgPixels.data[i + 2] = NewTable[y][x];
        }
    }

    for (y = 0; y < imgPixels.height; y++) {
        for (x = 0; x < imgPixels.width; x++) {
            NewTable[y][x] = 0;
            max = 0;
            for (let n = -1; n < 2; n++) {
                for (let m = -1; m < 2; m++) {
                    let a = 0, b = 0;
                    if (y + n < 0) a = -1 * (y + n);
                    else a = (y + n);
                    if (y + n >= imgPixels.height) a = y - n;
                    else a = (y + n);
                    if (x + m < 0) b = -1 * (x + m);
                    else b = (x + m);
                    if (x + m >= imgPixels.width) b = x - m;
                    else b = (x + m);
                    i = (a * 4) * imgPixels.width + b * 4;
                    i = Math.round(i);
                    if (imgPixels.data[i] > max)
                        max = imgPixels.data[i];
                }
            }
            NewTable[y][x] = max;
        }
    }


    for (y = 0; y < imgPixels.height; y++) {
        for (x = 0; x < imgPixels.width; x++) {
            i = (y * 4) * imgPixels.width + x * 4;
            imgPixels.data[i] = NewTable[y][x];
            imgPixels.data[i + 1] = NewTable[y][x];
            imgPixels.data[i + 2] = NewTable[y][x];
        }
    }

    canvasContext.putImageData(imgPixels, 0, 0);
    const img = new Image();
    img.src = canvas.toDataURL();
    canvasContext.drawImage(img, 0, 0);
};