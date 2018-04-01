"use strict";

const read = (file) => {

    const doc = document,
        canvas = doc.getElementById('myCanvas'),
        canvasContext = canvas.getContext("2d"),
        img = new Image();
    const size = 700;

    img.src = URL.createObjectURL(file);
    img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        canvasContext.drawImage(img, 0, 0, size, size);
    };
};

