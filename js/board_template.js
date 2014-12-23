$( document ).ready(function() {
    var canvas = new fabric.Canvas('canvas');

    /*
     * tool bar
     * */
    $('#toolbar > button').click(function (e) {
        var btn_id = e.target.id;
        //active
        $('#toolbar > button').removeClass('disabled');
        $('#' + btn_id).addClass('disabled');

        //drawingmode
        canvas.isDrawingMode = false;

        //switch tool
        switch (btn_id) {
            case 'tool-pencil':
                canvas.isDrawingMode = true;
                canvas.freeDrawingBrush.color = $('#drawing-color').val();
                canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').val(), 10) || 1;
                break;
            case 'tool-text':
                break;
        }
    });
    //draw
    $('#drawing-color').change(function () {
        canvas.freeDrawingBrush.color = $(this).val();
    });
    $('#text-add').click(function () {
        var text = $('#text-content').val();
        var color = $('#text-color').val();
        var x =  (parseInt($('#text-xp').val(), 10) * 2.83446) || 1;
        var y =  (parseInt($('#text-yp').val(), 10) * 2.83446) || 1;
        var sy = $('#text-sy').is(':checked');
        var opacity = (parseInt($('#text-opacity').val(), 10) /10) || 1;
        console.log('text: ' + text);
        console.log('color: ' + color);
        console.log('x: ' + x);
        console.log('y: ' + y);
        console.log('sy: ' + sy);
        console.log('opacity: ' + opacity);
        var t = new fabric.Text(text, {
            opacity: 0,
            color: color,
            left: x,
            top: y

        });
        canvas.add(t);
    });
    $('#drawing-line-width').change(function () {
        canvas.freeDrawingBrush.width = parseInt($(this).val(), 10) || 1;
        $('#drawing-line-width-val').text($(this).val());
    });

    //stamp
    $("input[name='shape']").change(function (e) {
        var shape = $(e.target).val();
        console.log(shape);

    });


/*
* sidebar
* */
    $('#tool-sidebar').click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $('#tool-save').click(function() {
        var png = canvas.toDataURL();
        window.location.replace(png);
    });
    $('#tool-clear').click(function() {
        canvas.clear();
    });




    function browser_check() {
        if (window.File && window.FileReader && window.FileList &&
            window.Blob) {
            //All the File APIs are supported.
        } else {
            alert('当前网页浏览器版本过低，请下载新版浏览器。建议使用新版google浏览器或火狐浏览器。');
        }
    }
    browser_check();




    $('#bg-color').change(function () {
        var color = $('#bg-color').val();
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    });
});