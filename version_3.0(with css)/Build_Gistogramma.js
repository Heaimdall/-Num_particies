"use strict";

document.getElementById("myThirdButton").onclick = () => {

    const newWin = window.open("about:blank", "hello5", "width=800,height=800");

    newWin.document.write(
        "<head>\n" +
        "\t<link rel='stylesheet' href='Face_Gistogramm.css' type='text/css'/>\n" +
        "\n" +
        "</head>" +
        "<canvas id='myCanvas' ></canvas>" +
        "<form action='handler.php'>" +
        "<p>Выберите границы от 1 до 255:</p>" +
        "<p>Минимальная граница : <input type='number' size='3' id='num' min='0' max='255' value = 50 ></p>" +
        "<p>Максимальная граница : <input type='number' size='3' id='num2' min='0' max='255' value=250 ></p>" +
        "<div>" +
        "<div id='sl2'></div>\n" +
        "<input type = 'button' id = 'Accept' value = 'Принять' class='btn-custom-accept' />" +
        "<input type = 'button' id = 'Cancel' value = 'Отмена' class='btn-custom-cancel' /> " +
        "</div>" +
        "</form>" +
        "<script>" +
        "document.getElementById('num').value = window.opener.document.getElementById('delta1').innerHTML ;" +
        "document.getElementById('num2').value = window.opener.document.getElementById('delta2').innerHTML ;" +
        "document.getElementById('Accept').onclick = () => {" +
        "window.opener.document.getElementById('delta1').innerHTML = document.getElementById('num').value; " +
        "window.opener.document.getElementById('delta2').innerHTML = document.getElementById('num2').value; " +
        "window.close();};" +
        "document.getElementById('Cancel').onclick = () => {window.close();};" +
        "</script>" +
        "<script src = 'MyDoubleSliderFinal.js' ></script>" +
        "<script type='text/javascript' src='Gistogramma.js'></script>"
    );

};
