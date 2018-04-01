"use strict";

const ShadesOfGrey = [];
const myColors = [];
let i;
let str;
let c;
for (i = 0; i < 256; i++) {
    ShadesOfGrey.push(0);
    c = Number(i).toString(16);
    if (i < 16) {
        str = "#" + '0' + c + '0' + c + '0' + c;
    }
    else {
        str = "#" + c + c + c;
    }
    myColors.push(str);
}

function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}


const Barchart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    let barSize = 0;
    let canvasActualHeight = 0;
    let maxValue = 0;

    this.draw = function () {
        let categ;
        maxValue = 0;
        this.options.data.forEach((element) => {
            maxValue = Math.max(maxValue, element);
        });
        canvasActualHeight = this.canvas.height - this.options.padding * 2;
        const canvasActualWidth = this.canvas.width - this.options.padding * 2;

        //drawing the grid lines
        let gridValue = 0;
        while (gridValue <= maxValue) {
            const gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );

            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.textBaseline = "bottom";
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10, gridY - 2);
            this.ctx.restore();

            gridValue += this.options.gridScale;
        }

        //drawing the bars
        let barIndex = 0;
        const numberOfBars = Object.keys(this.options.data).length;
        barSize = (canvasActualWidth) / numberOfBars;

        this.options.data.forEach((element) => {
            const barHeight = Math.round(canvasActualHeight * element / maxValue);
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex % this.colors.length]
            );

            barIndex++;
        });


        //drawing series name
        this.ctx.save();
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#7fdbcb";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height);
        this.ctx.restore();
    };

    this.redraw = function (num, val, numPred, valPred, colorPred) {
        let barHeight;
        barHeight = Math.round(canvasActualHeight * valPred / maxValue);
        drawBar(
            this.ctx,
            this.options.padding + numPred * barSize,
            this.canvas.height - barHeight - this.options.padding,
            barSize,
            barHeight,
            colorPred
        );
        barHeight = Math.round(canvasActualHeight * val / maxValue);
        drawBar(
            this.ctx,
            this.options.padding + num * barSize,
            this.canvas.height - barHeight - this.options.padding,
            barSize,
            barHeight,
            "#eb7314"
        );
    }
};

const canvas = window.opener.document.getElementById("myCanvas"),
    context = canvas.getContext("2d");

const imgPixels = context.getImageData(0, 0, canvas.width, canvas.height);

//const maxelem = 0;

for (let y = 0; y < imgPixels.height; y++) {
    for (let x = 0; x < imgPixels.width; x++) {
        const i = (y * 4) * imgPixels.width + x * 4;
        const color = imgPixels.data[i];

        ShadesOfGrey[color]++;
    }
}

let first = Math.round(imgPixels.height * imgPixels.width / 4);
let second = Math.round(imgPixels.height * imgPixels.width / 2);
let third = Math.round(imgPixels.height * imgPixels.width * 3 / 4);
let a = -1, b = -1;
c = -1;
for (i = 0; i < 255; i++) {

    first -= ShadesOfGrey[i];
    second -= ShadesOfGrey[i];
    third -= ShadesOfGrey[i];
    if ((first <= 0) && (a === -1)) {
        a = i;
    }
    if ((second <= 0) && (b === -1)) {
        b = i;
    }
    if ((third <= 0) && (c === -1)) {
        c = i;
    }
    if ((a !== -1) && (b !== -1) && (c !== -1)) {
        break;
    }
}

const FirstKvartel = a;
const SecondKvartel = b;
const ThirdKvartel = c;

window.opener.document.getElementById('delta1').innerHTML = FirstKvartel;
window.opener.document.getElementById('delta2').innerHTML = ThirdKvartel;

document.getElementById('num').value = FirstKvartel;
document.getElementById('num2').value = ThirdKvartel;

document.getElementById('sl2_knob').style.left = (parseInt(document.getElementById('sl2_knob').style.left) + FirstKvartel*2) + 'px';
document.getElementById('sl2_knob2').style.left = (parseInt(document.getElementById('sl2_knob2').style.left) + ThirdKvartel*2 - 510) + 'px';


let left = FirstKvartel;
let right = ThirdKvartel;

const myCanvas = document.getElementById("myCanvas");
myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");


const myBarchart = new Barchart(
    {
        canvas: myCanvas,
        seriesName: "Shades of Grey",
        padding: 20,
        gridScale: 500,
        gridColor: "#44eb34",
        data: ShadesOfGrey,
        colors: myColors
    }
);

myBarchart.draw();

myBarchart.redraw(left, ShadesOfGrey[left], left, ShadesOfGrey[left], myColors[left]);
myBarchart.redraw(right, ShadesOfGrey[right], right, ShadesOfGrey[right], myColors[right]);

document.getElementById('num').onchange = () => {
    myBarchart.redraw(document.getElementById('num').value, ShadesOfGrey[document.getElementById('num').value], left, ShadesOfGrey[left], myColors[left]);
    left = document.getElementById('num').value;
    document.getElementById('sl2_knob').style.left = left * 2 + 'px'
};


document.getElementById('num2').onchange = () => {
    myBarchart.redraw(document.getElementById('num2').value, ShadesOfGrey[document.getElementById('num2').value], right, ShadesOfGrey[right], myColors[right]);
    right = document.getElementById('num2').value;
    document.getElementById('sl2_knob2').style.left = right * 2 + 'px'
};