"use strict";

document.getElementById("mySixthButton").onclick = () => {
    const newWin = window.open("about:blank", "hello3", "width=700,height=700");
    newWin.document.write("<!DOCTYPE html>\n" +
        "<html>\n" +
        "<head>\n" +
        "    <meta charset='utf-8' />\n" +
        "<link rel='stylesheet' href='Callibration_css.css' type='text/css'/>" +
        "</head>\n" +
        "<body>\n" +
        "\n" +
        "<form name='myForm'>\n" +
        "    <select name='language' size='10'>\n" +
        "    </select>\n" +
        "    <p><input type='text' name='textInput' placeholder='Введите текст' /></p>\n" +
        "    <p><input type='number' name='valueInput1' placeholder='Введите значение X :' /></p>\n" +
        "    <p><input type='number' name='valueInput2' placeholder='Введите значение Y :' /></p>\n" +
        "    <p><input type='text' name='valueInput3' placeholder='Введите единицы измерения :' /></p>\n" +
        "    <p><input type='button' name='addButton' value='Добавить' class='button'  /><input type='button' name='removeButton' value='Удалить' class='button' /></p>\n" +
        "</form>\n" +
        "<div id='selection'>\n" +
        "    Название : Default <br/>\n" +
        "    X : = 0,290946990251541 <br/>\n" +
        "    Y : = 0,290946990251541 <br/>\n" +
        "    Единицы измерения : мм <br/>\n" +
        "</div>\n" +
        "<div>\n" +
        "    <input type = 'button' id = 'Accept' value = 'Принять' class='btn-custom-accept' />\n" +
        "   <input type = 'button' id = 'Cancel' value = 'Отмена' class='btn-custom-cancel'/>\n" +
        "</div>\n" +
        "\n" +
        "<script>\n" +
        "    var addButton = myForm.addButton,\n" +
        "        removeButton = myForm.removeButton,\n" +
        "        languagesSelect = myForm.language;\n" +
        "    // обработчик добавления элемента\n" +
        "    for (i = 0; i < window.opener.Calibrations.length; i++){\n" +
        "        var newOption = new Option(window.opener.Calibrations[i][3], i);\n" +
        "        languagesSelect.options[languagesSelect.options.length] = newOption;\n" +
        "    }" +
        "    languagesSelect.options[0].selected = 'selected';" +
        "    function addOption(){\n" +
        "        // получаем текст для элемента\n" +
        "        var text = myForm.textInput.value;\n" +
        "        // получаем значение для элемента\n" +
        "        var value1 = myForm.valueInput1.value;\n" +
        "        var value2 = myForm.valueInput2.value;\n" +
        "        var value3 = myForm.valueInput3.value;\n" +
        "        if ((text !== '') && (value1 !== '') && (value2 !== '') && (value3 !== '')) {\n" +
        "            var newOption = new Option(text, window.opener.Calibrations.length);\n" +
        "            window.opener.Calibrations.push([value1, value2, value3, text]);\n" +
        "            languagesSelect.options[languagesSelect.options.length] = newOption;\n" +
        "        }\n" +
        "        else{\n" +
        "            alert('ВВЕДЕНЫ НЕ ВСЕ ЗНАЧЕНИЯ');\n" +
        "        }\n" +
        "    }\n" +
        "    // обработчик удаления элемент\n" +
        "    function removeOption(){\n" +
        "\n" +
        "        var selectedIndex = languagesSelect.options.selectedIndex;\n" +
        "        // удаляем элемент\n" +
        "        languagesSelect.options[selectedIndex] = null;\n" +
        "    }\n" +
        "\n" +
        "    addButton.addEventListener('click', addOption);\n" +
        "    removeButton.addEventListener('click', removeOption);\n" +
        "</script>\n" +
        "\n" +
        "<script>\n" +
        "    var languagesSelect = document.myForm.language;\n" +
        "\n" +
        "    function changeOption(){\n" +
        "\n" +
        "        var selection = document.getElementById('selection');\n" +
        "        var selectedOption = languagesSelect.options[languagesSelect.selectedIndex];\n" +
        "        window.opener.num = selectedOption.value;\n" +
        "        selection.innerHTML = '';\n" +
        "        selection.innerHTML +=' Название :  ' + selectedOption.text + '<br/>';" +
        "        selection.innerHTML += 'X : ' + window.opener.Calibrations[selectedOption.value][0] + '<br/>';\n" +
        "        selection.innerHTML +='Y : ' + window.opener.Calibrations[selectedOption.value][1] + '<br/>';\n" +
        "        selection.innerHTML += 'Единицы измерения : ' + window.opener.Calibrations[selectedOption.value][2] + '<br/>';\n" +
        "    }\n" +
        "\n" +
        "    languagesSelect.addEventListener('change', changeOption);\n" +
        "</script>\n" +
        "\n" +
        "'<script>\n" +
        "document.getElementById('Accept').onclick = () => {\n" +
        "    window.opener.document.getElementById('delta3').innerHTML = window.opener.Calibrations[window.opener.num][0];\n" +
        "    window.opener.document.getElementById('delta4').innerHTML = window.opener.Calibrations[window.opener.num][1] ;\n" +
        "    window.opener.document.getElementById('pixelSize').innerHTML = window.opener.Calibrations[window.opener.num][2];\n" +
        "    window.close();\n" +
        "};\n" +
        "document.getElementById('Cancel').onclick = () => {window.close();};\n" +
        "</script>\n" +
        "\n" +
        "</body>\n" +
        "</html>")
};