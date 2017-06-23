$(document).ready(function() {
    var lastButton = "";
    var contentTop = "";
    var contentBottom = "0";
    var clearResult = false;
    fillDisplay(contentTop, contentBottom);

    $('button').click(function() {
        if (contentBottom.length > 19) {
            contentBottom = "Digit Limit Met";
            clearResult = true;
        }
        fillDisplay(contentTop, contentBottom);


        if (clearResult) {
            contentBottom = "0";
            contentTop = "";
            lastButton = "";
            clearResult = !clearResult;
        }
        var $this = $(this);
        switch ($this.attr('class')) {

            case 'deci':
                {

                    var indexOfDecimal = contentBottom.indexOf('.');
                    if (indexOfDecimal < 0) {
                        contentBottom = contentBottom.concat('.');
                        fillDisplay(contentTop, contentBottom);
                    }

                    break;
                }
            case 'special':
                {
                    if ($this.text() == 'AC') {

                        contentTop = "";
                        contentBottom = "0";
                        lastButton = "";
                        fillDisplay(contentTop, contentBottom);

                    } else {
                        if ($this.text() == 'CE') {
                            contentBottom = "0";
                            fillDisplay(contentTop, contentBottom);
                        }
                    }
                    break;
                }
            case 'num':
            case 'zero':
                {

                    if (contentBottom == "0") {
                        contentBottom = $this.text();
                    } else {
                        if (lastButton == "/" || lastButton == '+' || lastButton == '-' || lastButton == '*') {
                            contentBottom = $this.text();
                        } else {
                            contentBottom = contentBottom + $this.text();
                        }
                    }
                    fillDisplay(contentTop, contentBottom);
                    lastButton = $this.text();
                    break;
                }
            case 'operator':
                {

                    contentTop = contentTop + contentBottom + $this.text();
                    fillDisplay(contentTop, contentBottom);
                    lastButton = $this.text();
                    break;
                }
            case 'eq':
                {
                    contentBottom = math.eval(contentTop + contentBottom);
                    contentTop = "";
                    if (contentBottom == "Infinity" || contentBottom == "-Infinity" || contentBottom == "NaN") {
                        contentBottom = "Invalid Result";
                        clearResult = true;

                    }
                    fillDisplay(contentTop, contentBottom);
                    lastButton = $this.text();
                    break;
                }
        }
    });

    function fillDisplay(contentTop, contentBottom) {
        $(".display-bottom").text(contentBottom);
        $(".display-top").text(contentTop);

    };
});