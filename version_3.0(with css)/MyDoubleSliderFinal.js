"use strict";

class slider {
    constructor(elemId, sliderWidth, range1, range2, step) {

        const knobWidth = 5;
        const knobHeight = 20;
        const sliderHeight = 5;

        let offsX, tmp;
        const d = document;
        const isIE = d.all || window.opera;	// определяем модель DOM
        const point = (sliderWidth - knobWidth - 3) / (range2 - range1);
        // point - количество пикселей на единицу значения

        const slider = d.createElement('DIV');
        slider.id = elemId + '_slider';
        slider.className = 'slider';
        d.getElementById(elemId).appendChild(slider);

        const knob = d.createElement('DIV');
        knob.id = elemId + '_knob';
        knob.className = 'knob';
        slider.appendChild(knob);

        const knob2 = d.createElement('DIV');
        knob2.id = elemId + '_knob2';
        knob2.className = 'knob';
        slider.appendChild(knob2); // добавляем его в документ

        knob.style.left = 0 + 'px';
        knob.style.width = knobWidth + 'px';
        knob.style.height = knobHeight + 'px';
        knob2.style.left = sliderWidth - knobWidth - 3 + 'px';
        knob2.style.width = knobWidth + 'px';
        knob2.style.height = knobHeight + 'px';
        slider.style.width = sliderWidth + 'px';
        slider.style.height = sliderHeight + 'px';

        let sliderOffset = slider.offsetLeft;			// sliderOffset - абсолютное смещение slider'а
        tmp = slider.offsetParent;		               // от левого края в пикселях (в IE не работает)
        while (tmp.tagName !== 'BODY') {
            sliderOffset += tmp.offsetLeft;
            tmp = tmp.offsetParent;
        }

        if (isIE) {
            knob.onmousedown = startCoord;
            knob2.onmousedown = startCoord2;
        }
        else {
            knob.addEventListener("mousedown", startCoord, true);
            knob2.addEventListener("mousedown", startCoord2, true);
        }

        //////////////////// функции установки/получения значения //////////////////////////

        function setValue(x) {
            let val = 0;
            if (x < 0) {
                knob.style.left = 0 + 'px';
                document.getElementById('num').value = 0;
                val = 0;
            }
            else if (x > parseInt(knob2.style.left) - 1) {
                knob.style.left = (parseInt(knob2.style.left) - 1) + 'px';
                document.getElementById('num').value = Math.floor((parseInt(knob2.style.left) - 1) / 2);
                val = Math.floor((parseInt(knob2.style.left) - 1) / 2)
            }
            //else if(x > parseInt(knob2.style.left)-knobWidth/2) knob.style.left = (parseInt(knob2.style.left)-knobWidth/2)+'px';
            else {
                if (step === 0) {
                    knob.style.left = x + 'px';
                    document.getElementById('num').value = Math.floor(x / 2);
                    val = Math.floor(x / 2);
                }
                else {
                    knob.style.left = Math.round(x / (step * point)) * step * point + 'px';
                    document.getElementById('num').value = Math.floor(Math.round(x / (step * point)) * step * point / 2);
                    val = Math.floor(Math.round(x / (step * point)) * step * point / 2);
                }
            }
            myBarchart.redraw(val, ShadesOfGrey[val], left, ShadesOfGrey[left], myColors[left]);
            left = val;
        }

        /*function setValue2(x)	// установка по значению
        {
            if(x < range1 || x > range2) alert('Value is not included into a slider range!');
            else setValue((x-range1)*point);

            //d.getElementById('info').value = getValue();
        }

        function getValue()
        {return Math.round(parseInt(knob.style.left)/point)+range1;}*/

        function setValue3(x) {
            let val = 0;
            if (x < parseInt(knob.style.left) + 1) {
                knob2.style.left = (parseInt(knob.style.left) + 1) + 'px';
                document.getElementById('num2').value = Math.floor((parseInt(knob.style.left) + 1) / 2);
                val = Math.floor((parseInt(knob.style.left) + 1) / 2);
            }
            else if (x > sliderWidth - knobWidth - 3) {
                knob2.style.left = (sliderWidth - 3 - knobWidth) + 'px';
                document.getElementById('num2').value = Math.floor((sliderWidth - 3 - knobWidth) / 2);
                val = Math.floor((sliderWidth - 3 - knobWidth) / 2);
            }
            else {
                if (step === 0) {
                    knob2.style.left = x + 'px';
                    document.getElementById('num2').value = Math.floor(x / 2);
                    val = Math.floor(x / 2);
                }
                else {
                    knob2.style.left = Math.round(x / (step * point)) * step * point + 'px';
                    document.getElementById('num2').value = Math.floor((Math.round(x / (step * point)) * step * point) / 2);
                    val = Math.floor((Math.round(x / (step * point)) * step * point) / 2);
                }
            }
            myBarchart.redraw(val, ShadesOfGrey[val], right, ShadesOfGrey[right], myColors[right]);
            right = val;
        }

        /* function getValue()
         {return Math.round(parseInt(knob2.style.left)/point)+range1;}*/

        /*function sliderClick(e) {
            var x;
            if(isIE) {
                if(event.srcElement != slider) return; //IE onclick bug
                x = event.offsetX - Math.round(knobWidth/2);
            }
            else x = e.pageX-sliderOffset-knobWidth/2;
            setValue(x);
        }*/

        function startCoord(e) {
            if (isIE) {
                offsX = event.clientX - parseInt(knob.style.left);
                document.onmousemove = mov;
                document.onmouseup = endCoord;
            }
            else {
                document.addEventListener("mousemove", mov, true);
                document.addEventListener("mouseup", endCoord, true);
            }
        }

        function mov(e) {
            let x;
            if (isIE) x = event.clientX - offsX;
            else x = e.pageX - sliderOffset - knobWidth / 2;

            setValue(x);
        }

        function endCoord() {
            if (isIE) {
                document.onmousemove = null;
                document.onmouseup = null;
            }
            else {
                document.removeEventListener("mousemove", mov, true);
                document.removeEventListener("mouseup", endCoord, true);
            }
        }

        function startCoord2(e) {
            if (isIE) {
                offsX = event.clientX - parseInt(knob2.style.left);
                document.onmousemove = mov2;
                document.onmouseup = endCoord2;
            }
            else {
                document.addEventListener("mousemove", mov2, true);
                document.addEventListener("mouseup", endCoord2, true);
            }
        }

        function mov2(e) {
            let x;
            if (isIE) x = event.clientX - offsX;
            else x = e.pageX - sliderOffset - knobWidth / 2;

            setValue3(x);
        }

        function endCoord2() {
            if (isIE) {
                document.onmousemove = null;
                document.onmouseup = null;
            }
            else {
                document.removeEventListener("mousemove", mov2, true);
                document.removeEventListener("mouseup", endCoord2, true);
            }
        }
    }
}


const mysl2 = new slider('sl2', 518, 1, 255, 1);
