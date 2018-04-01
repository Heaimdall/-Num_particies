"use strict";

let count = 1, x_paint = 0, y_paint = 0;
let OutMap;

function Piece(parameters) {
    this.Points = parameters.points;
    this.perimetr = 0;
    this.ploshad = 0;
    this.Lmax = 0;
    this.Lmin = 0;
    this.angle = 0;
    this.F = 0;
    this.minX = parameters.minX;
    this.maxX = parameters.maxX;
    this.minY = parameters.minY;
    this.maxY = parameters.maxY;
}

function boardPixel(y, x, width, height) {
    return ((y < height) && (y >= 0) && (x < width) && (x - 1 >= 0) && (OutMap[y][x - 1] === 0)) ||
        ((y < height) && (y >= 0) && (x >= 0) && (x + 1 < width) && (OutMap[y][x + 1] === 0)) ||
        ((y < height) && (x < width) && (x >= 0) && (y - 1 >= 0) && (OutMap[y - 1][x] === 0)) ||
        ((y >= 0) && (x < width) && (x >= 0) && (y + 1 < height) && (OutMap[y + 1][x] === 0))
}

document.getElementById('myFifthButton').onclick = () => {
    let x;
    let y;
    let j;
    let i;
    const canvas = document.getElementById("myCanvas"),
        canvasContext = canvas.getContext("2d");

    const imgPixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

    let stackPoints = [], Points = [], Pieces = [];

    OutMap = new Array(imgPixels.height);

    for (i = 0; i < imgPixels.height; i++) {
        OutMap[i] = new Array(imgPixels.width);
    }

    for (i = 0; i < imgPixels.height; i++) {
        for (j = 0; j < imgPixels.width; j++) {
            OutMap[i][j] = 0;
        }
    }

    const height = imgPixels.height, width = imgPixels.width;

    //const t0 = performance.now();

    for (y = 0; y < height; y++) {
        let minX = 10000,
            maxX = 0,
            minY = 10000,
            maxY = 0;
        for (x = 0; x < width; x++) {
            i = (y * 4) * width + x * 4;

            if ((imgPixels.data[i] === 0) && (OutMap[y][x] === 0)) {
                stackPoints.push(x);
                stackPoints.push(y);
                while (stackPoints.length > 0) {
                    y_paint = stackPoints.pop();
                    x_paint = stackPoints.pop();
                    i = (y_paint * 4) * width + x_paint * 4;
                    if ((y_paint >= 0) && (y_paint < height) &&
                        (x_paint >= 0) && (x_paint < width) &&
                        (imgPixels.data[i] === 0) &&
                        (OutMap[y_paint][x_paint] === 0)) {

                        OutMap[y_paint][x_paint] = count;
                        Points.push([y_paint, x_paint]);
                        if (x_paint > maxX) {
                            maxX = x_paint
                        }
                        if (x_paint < minX) {
                            minX = x_paint
                        }
                        if (y_paint > maxY) {
                            maxY = y_paint
                        }
                        if (y_paint < minY) {
                            minY = y_paint
                        }
                        stackPoints.push(x_paint + 1);
                        stackPoints.push(y_paint);
                        stackPoints.push(x_paint);
                        stackPoints.push(y_paint - 1);
                        stackPoints.push(x_paint - 1);
                        stackPoints.push(y_paint);
                        stackPoints.push(x_paint);
                        stackPoints.push(y_paint + 1);
                    }
                }
                count++;
                const newPiece = new Piece({points: Points, minY: minY, maxY: maxY, minX: minX, maxX: maxX});
                Points = [];
                Pieces.push(newPiece);
            }
        }
    }

    let K = 0, A = 0, C = 0, Lmax = 0, Lmin = 1000000, D = 0, xMaxLen = 0, yMaxLen = 0;

    for (i = 0; i < Pieces.length; i++) {
        K = 0, A = 0, C = 0, Lmax = 0, Lmin = 1000000, D = 0, xMaxLen = 0, yMaxLen = 0;
        for (j = 0; j < Pieces[i].Points.length; j++) {
            [y, x] = Pieces[i].Points[j];
            C = [(Pieces[i].maxY + Pieces[i].minY) / 2, (Pieces[i].maxX + Pieces[i].minX) / 2];
            if (boardPixel(y, x, width, height)) {
                K++;
                D = Math.sqrt((C[0] - y) * (C[0] - y) + (C[1] - x) * (C[1] - x));
                D = D * 2;
                if (D > Lmax) {
                    Lmax = D;
                    xMaxLen = x;
                    yMaxLen = y;
                }
                if ((D < Lmin) && (D !== 0)) {
                    Lmin = D;
                }
                if (boardPixel(y + 1, x + 1, width, height)) {
                    if (!((boardPixel(y + 1, x, width, height)) && (boardPixel(y, x + 1, width, height)))) {
                        A++;
                    }
                }
                if (boardPixel(y - 1, x + 1, width, height)) {
                    if (!((boardPixel(y - 1, x, width, height)) && (boardPixel(y, x + 1, width, height)))) {
                        A++;
                    }
                }
                if (boardPixel(y + 1, x - 1, width, height)) {
                    if (!((boardPixel(y + 1, x, width, height)) && (boardPixel(y, x - 1, width, height)))) {
                        A++;
                    }
                }
                if (boardPixel(y - 1, x - 1, width, height)) {
                    if (!((boardPixel(y - 1, x, width, height)) && (boardPixel(y, x - 1, width, height)))) {
                        A++;
                    }
                }

            }
        }
        Pieces[i].ploshad = Pieces[i].Points.length;
        Pieces[i].perimetr = K + (A / 2) * (Math.sqrt(2) - 1);
        if (Lmax === 0)
            Lmin = 0;
        Pieces[i].Lmax = Lmax;
        Pieces[i].Lmin = Lmin;
        if (Lmax === 0)
            Pieces[i].F = 0;
        else
            Pieces[i].F = Lmin / Lmax;
       // if (((C[1] - yMaxLen) === 0) || ((C[1] - yMaxLen) === 0))
       //     Pieces[i].angle = 0;
       // else
        Pieces[i].angle = Math.atan(Math.sqrt(((C[0] - xMaxLen) / (C[1] - yMaxLen)) * ((C[0] - xMaxLen) / (C[1] - yMaxLen))));
    }
    //const t1 = performance.now();
    //alert('Took' + String((t1 - t0).toFixed(4)) +  'milliseconds');

    const data = [];
    const delimiter = ',';
    const EOL = "\r\n";

    data.push(["Piece number", "Square", "Perimeter", "Lenght", "Width", "Form-factor", "Angle of inclination"]);
    for (i = 0; i < Pieces.length; i++) {
        data.push([i + 1, Pieces[i].ploshad, Pieces[i].perimetr, Pieces[i].Lmax, Pieces[i].Lmin, Pieces[i].F, Pieces[i].angle]);
    }

    const rows = data.map(function (el) {
        return el.join(delimiter) + EOL;
    });

    rows.unshift('sep=,' + EOL);

    const newWin = window.open("about:blank", "hello", "width=1000,height=700");

    newWin.document.write(
        "<head>\n" +
        "    <meta charset='utf-8' />\n" +
        "<link rel='stylesheet' href='Table_css.css' type='text/css'/>" +
        "</head>\n" );

    newWin.document.write("<table>\n" +
        "  <tr>\n" +
        "    <th>Piece number</th>\n" +
        "    <th>Square</th>\n" +
        "    <th>Perimeter</th>\n" +
        "    <th >Lenght</th>\n" +
        "    <th >Width</th>\n" +
        "    <th >Form-factor</th>\n" +
        "    <th >Angle of inclination</th>\n" +
        "  </tr>\n");

    for (i = 0; i < Pieces.length; i++) {
        newWin.document.write("<tr>\n" +
            "    <td >" + (i + 1) + "</td>\n" +
            "    <td>" + Pieces[i].ploshad + "</td>\n" +
            "    <td>" + Pieces[i].perimetr + "</td>\n" +
            "    <td> " + Pieces[i].Lmax + " </td>\n" +
            "    <td>" + Pieces[i].Lmin + "</td>\n" +
            "    <td>" + Pieces[i].F + "</td>\n" +
            "    <td>" + Pieces[i].angle + "</td>\n" +
            "  </tr>\n");
    }
    newWin.document.write("</table>");

    newWin.document.write("<input type = 'button' id = 'myButton7' value = 'Сохранить' class='button' />");
    newWin.document.write("<input type = 'button' id = 'myButton8' value = 'Пересчиnать с калибровкой' class='button' />");

    newWin.document.getElementById("myButton7").onclick = () => {
        saveAs(new Blob(rows, {type: 'text/csv;charset=utf-8;'}), 'data.csv');
    };
    let  newWin2;

    newWin.document.getElementById("myButton8").onclick = () => {
        const x =Calibrations[num][0];
        const y =Calibrations[num][1];
        const size =x*y;
        const units = Calibrations[num][2];

        newWin2 = window.open("about:blank", "hello2", "width=1000,height=700");

        newWin2.document.write(
            "<head>\n" +
            "    <meta charset='utf-8' />\n" +
            "<link rel='stylesheet' href='Table_css.css' type='text/css'/>" +
            "</head>\n" );

        newWin2.document.write("<table>\n" +
            "  <tr>\n" +
            "    <th>Piece number</th>\n" +
            "    <th>Square, "+ units + "</th>\n" +
            "    <th>Perimeter, "+ units + "</th>\n" +
            "    <th >Lenght, "+ units + "</th>\n" +
            "    <th >Width, "+ units + "</th>\n" +
            "    <th >Form-factor, "+ units + "</th>\n" +
            "    <th >Angle of inclination, "+ units + "</th>\n" +
            "  </tr>\n");

        for (i = 0; i < Pieces.length; i++) {
            newWin2.document.write("<tr>\n" +
                "    <td >" + (i + 1) + "</td>\n" +
                "    <td>" + Pieces[i].ploshad * size + "</td>\n" +
                "    <td>" + Pieces[i].perimetr * size + "</td>\n" +
                "    <td> " + Pieces[i].Lmax * size + " </td>\n" +
                "    <td>" + Pieces[i].Lmin * size + "</td>\n" +
                "    <td>" + Pieces[i].F * size + "</td>\n" +
                "    <td>" + Pieces[i].angle * size + "</td>\n" +
                "  </tr>\n");
        }
        newWin2.document.write("</table>");

        newWin2.document.write("<input type = 'button' id = 'myButton9' value = 'Сохранить' class='button' />");

        newWin2.document.getElementById("myButton9").onclick = () => {
                saveAs(new Blob(rows, {type: 'text/csv;charset=utf-8;'}), 'data.csv');
        };
    };
};
