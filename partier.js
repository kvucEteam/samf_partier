var koordinatsystem_size = $(".droppable").width();
var size_multiplier = 15;
var runde = 0;

var spacer = 0;
var randomize_Array = [];

var opgavetype;
var tweeneed_y_pos;

var $newPosX; // = ui.offset.left - $(this).offset().left;
var $newPosY; // = ui.offset.top - $(this).offset().top;
var x_grid; // = $newPosX / (koordinatsystem_size - ui.draggable.width());
var y_grid;

var over = false;
var xPos;
var yPos;

var img_width;


$(document).ready(function() {


    if (opgavetype == "fordeling") {
        $('.instr_container').html(instruction_noLines(jsonData.userInterface.instruktion_fordeling)); // Tilføjet af THAN d. 02/01-2018.
    } else if (opgavetype == "værdi") {
        $('.instr_container').html(instruction_noLines(jsonData.userInterface.instruktion_vaerdi)); // Tilføjet af THAN d. 02/01-2018.
    }

    //$(".koordinatsystem_size").html("Console: <br/>Koordinatsystem_size: " + koordinatsystem_size);

    $(".edit_title").click(function() {
        edit_title();
    });

    init();

    $(".koordinatsystem_size").css("display", "none");


});

function init() {

    /*----------  Randomize dataset  ----------*/

    for (var i = 0; i < jsonData.partier.length; i++) {
        randomize_Array.push(i);
    }

    var rand_tal = Math.floor(Math.random() * randomize_Array.length);
    runde = randomize_Array[rand_tal];

    randomize_Array.splice(rand_tal, 1); //, item1, ....., itemX)

    /*----------  Randomize dataset  ----------*/



    $(".btn-borre").click(function() {
        if (opgavetype == "fordeling") {
            UserMsgBox("body", "<h3>Hvilke kriterier placerer vi partierne ud fra?</h3><p>Placeringen af partierne på den fordelingspolitiske og den værdipolitiske akse er siden 1995 foretaget ud fra svarene på nogle spørgsmål, der er udvalgt af politologen Ole Borre. De centrale spørgsmål som partier og personer bliver spurgt om i forhold til fordelingspolitik er: <ol><br/><li>Bør folk i højere grad kunne klare sig selv uden overførsler (for eksempel kontanthjælp eller dagpenge) end tilfældet er i dag? </li><br/><li>Skal indtægter beskattes mere eller mindre end de bliver i dag? </li><br/><li>Er indkomstforskellene og forskellene i levestandard i Danmark for store eller for små? </li><br/><li>Skal virksomhederne i højere grad selv have lov til at ordne deres forretninger, eller er det fint at staten går ind og regulerer dem?</li><br/></ol>")
        } else if (opgavetype == "værdi") {
            // UserMsgBox("body", "<h3>Hvilke kriterier placerer vi partierne ud fra?</h3><p>De spørgsmål placeringen afgøres efter er: <ol><li>Udgør indvandring alvorlig trussel mod vores nationale egenart?</li><li>Bør den økonomiske vækst sikres gennem en udbygning af industrien, også selvom det kommer i strid med miljøinteresser</li><li>Bør voldsforbrydelser straffes langt hårdere end i dag?</li><li>Bruger det offentlige for mange penge, passende eller for få penge på ulandsbistand?</li></ol>");                                                                                                                                                                                                                                     // Udkommenteret af THAN d. 3/5-2018. 
            UserMsgBox("body", "<h3>Hvilke kriterier placerer vi partierne ud fra?</h3><p>Placeringen af partierne på den fordelingspolitiske og den værdipolitiske akse er siden 1995 foretaget ud fra svarene på nogle spørgsmål, der er udvalgt af politologen Ole Borre. De centrale spørgsmål som partier og personer bliver spurgt om i forhold til værdipolitik er: <ol><br/><li>Udgør indvandring alvorlig trussel mod vores nationale egenart?</li><br/><li>Bør den økonomiske vækst sikres gennem en udbygning af industrien, også selvom det kommer i strid med miljøinteresser</li><br/><li>Bør voldsforbrydelser straffes langt hårdere end i dag?</li><br/><li>Bruger det offentlige for mange penge, passende eller for få penge på ulandsbistand?</li><br/></ol>");  // Tilføjet af THAN d. 3/5-2018. FR ønsker denne tekst i stedet for.
        }
    })

    $(".btn_ghost").click(function() {
        info($(this));
    });

    if (opgavetype == "værdi") {
        populate_koordinatsystem();
    }

    make_card();

    if (opgavetype == "fordeling") {
        microhint($(".draggable"), "Træk partiets logo til den rigtige position på den vandrette akse.");
    } else if (opgavetype == "værdi") {
        microhint($(".draggable"), "Partierne er låst fast på den vandrette akse. Træk  partiets logo til den rigtige position på den lodrette akse.");
    } else if (opgavetype == "fri") {
        microhint($(".draggable"), "Placer partierne på begge akser, som du synes de passer.", true, '#000');
        microhint($(".glyphicon-edit"), 'Her kan du ændre opgavebeskrivelsen, fx "Placer partierne ift. Skattepolitik og miljøpolitik."', true, '#000');
        $('.microhint').addClass('removeHintByClick');
    }

    if ($(window).width() < 980) {
        // $(".btn_ghost").html("Info");                                       // Udkommenteret af THAN d. 3/5-2018
        $(".btn_ghost").removeClass("btn-sm").addClass("btn-xs xs-fontSize");  // Tilføjet af THAN d. 3/5-2018. TLY ønsker sig mindre btns. 
    }

    if ($(window).width() < 1000) {
        img_width = "40px";

    } else {
        img_width = "60px";
    }
    $(".draggable, .draggable_container").css("width", img_width).css("height", img_width);

}

$(document).on('click touchend', ".removeHintByClick", function(event) {  // TLY ønsker sig multiple microhints - her fjernes de to første et efter et ved klik.
    $(this).fadeOut(400).remove();
});

function removeDescribingTextInCards() {  // Tilføjet af THAN d. 3/5-2018. Denne kaldes i HTML-filen for opgavetype == "fri". Denne funktion fjerner alt partibeskeivende tekst (f_politik) i JSON data.
    for (var n in jsonData.partier) {
        jsonData.partier[n].f_politik = '';
        jsonData.partier[n].v_politik = '';
    }
}

/*$(window).resize(function() {
    koordinatsystem_size = $(".droppable").width();
    $(".koordinatsystem_size").html("Console: " + runde + "<br/>Koordinatsystem_size: " + koordinatsystem_size);
});*/


/*=============================================
=            DROPPABLE comment block            =
=============================================*/

$(".droppable").droppable({
    accept: ".draggable",
    hoverClass: "drop-hover",
    over: function(event, ui) {
        over = true;
    },
    out: function() {
        over = false;
    },
    drop: function(event, ui) {
        console.log("DEN SKAL PLACERES på x: " + jsonData.partier[runde].alt_x_placering + "DEN SKAL PLACERES på y: " + jsonData.partier[runde].alt_y_placering);

        $newPosX = ui.offset.left - $(this).offset().left;
        $newPosY = ui.offset.top - $(this).offset().top;

        console.log($newPosX + ", " + $newPosY);

        x_grid = $newPosX / (koordinatsystem_size - ui.draggable.width());
        y_grid = $newPosY / (koordinatsystem_size - ui.draggable.height());

        x_grid = (Math.round(x_grid * 10) - 5);
        y_grid = (Math.round(y_grid * 10) - 5);

        $(".partipos").html("x_grid: " + x_grid + ", y_grid: " + y_grid + "<br/>Rounded_X: " + (Math.round(x_grid * 10) - 5) + "<br/>Rounded_Y: " + (Math.round(y_grid * 10) - 5));
        //alert($(".koordinatsystem_container").width() / 10 * (jsonData.partier[runde].x_placering + 5));

        var tweeneed_x_pos = (koordinatsystem_size / 10 * (jsonData.partier[runde].x_placering + 5) - ui.draggable.width() / 2);
        var tweeneed_y_pos = -Math.abs(koordinatsystem_size / 2 + ui.draggable.height() / 2);
        console.log("tweeneed_y_pos: " + tweeneed_y_pos);

        //ui.draggable.css('top', 100);
        //ui.draggable.css('left', $(this).position().left);
        console.log(x_grid + ", INDEXOF:" + jsonData.partier[runde].alt_x_placering.indexOf(x_grid));

        //alert("runde: " + runde);

        /*======================================================
        =             Opgavetype = Fordeling (droppable funktioner)            =
        ======================================================*/

        console.log('drop - runde: ' + runde + ', x_grid: ' + x_grid + ', typeof(x_grid): ' + typeof(x_grid) +  + ', jsonData.partier[runde].alt_x_placering: ' + jsonData.partier[runde].alt_x_placering + ', typeof(jsonData.partier[runde].alt_x_placering): ' + typeof(jsonData.partier[runde].alt_x_placering));

        if (opgavetype == "fordeling") {

            if (jsonData.partier[runde].alt_x_placering.indexOf(x_grid) > -1) { 

                UserMsgBox("body", "<h3>Rigtigt</h3><p>Du har placeret partiet indenfor det rigtige område på aksen. <br/>Partiet bliver flyttet på plads for at sikre, at det er korrekt placeret i forhold til de andre partier.");
                $(".MsgBox_bgr").click(function() {

                    ui.draggable.appendTo(".koordinatsystem_container");
                    $(".koordinatsystem_container").css("height", koordinatsystem_size + "px");

                    ui.draggable.css("left", (tweeneed_x_pos - ui.draggable.width() * spacer) + "px").css("top", tweeneed_y_pos + "px");
                    ui.draggable.removeClass("grabbing");
                    ui.draggable.draggable("disable");
                    ui.draggable.css("box-shadow", "none");



                    var rand_tal = Math.floor(Math.random() * randomize_Array.length);
                    runde = randomize_Array[rand_tal];
                    spacer++;

                    randomize_Array.splice(rand_tal, 1); //, item1, ....., itemX)

                    console.log(runde + ", " + jsonData.partier.length);
                    if (runde < jsonData.partier.length) {
                        make_card();
                    } else {

                        /*----------  Slutfeedback fordeling  ----------*/

                        $(".interface_header").html("Du er færdig med opgaven.");
                        $(".draggable_container").html("");
                        //ttr("src", );
                        $(".interface_txt").html("");

                    }

                    $(".MsgBox_bgr").off("click");

                });

            } else {

                var placering = ""

                console.log("x_grid: " + x_grid + ", x_placering" + jsonData.partier[runde].x_placering);

                var korrekt_x = parseInt(jsonData.partier[runde].x_placering);
                x_grid = parseInt(x_grid);

                if (x_grid < korrekt_x) {
                    placering = "Du har placeret partiet for langt til venstre"
                } else {
                    placering = "Du har placeret partiet for langt til højre"
                }
                UserMsgBox("body", "<h3>Forkert placering</h3><p>" + placering + "</p>");

                $(".MsgBox_bgr").click(function() {
                    ui.draggable.css("height", img_width).css("width", img_width);
                    $(".draggable_container").css("height", img_width).css("width", img_width);
                    ui.draggable.animate({
                        left: "0",
                        top: "0"
                    }, 300, function() {
                        // Animation complete.
                    });
                    $(".MsgBox_bgr").off("click");
                });
            }

            /*=============================================
            =            Section comment block            =
            =============================================*/

            /*==========================================
            =            Opgavetype = værdi            =
            ==========================================*/

        } else if (opgavetype == "værdi") {
            var active_num = parseInt(ui.draggable.attr("id")[5]);
            var active = "#drag_v" + active_num;

            if (jsonData.partier[runde].alt_y_placering.indexOf(y_grid) > -1) {
                UserMsgBox("body", "<h3>Rigtigt</h3><p>Du har placeret partiet indenfor det rigtige område på aksen. <br/>Partiet bliver flyttet på plads på den lodrette akse for at sikre, at det er korrekt placeret i forhold til de andre partier.");


                console.log("y_placering for: " + active_num + " , " + jsonData.partier[active_num].y_placering)


                tweeneed_y_pos = (koordinatsystem_size / 10) * (parseFloat(jsonData.partier[active_num].y_placering) + 5) - ui.draggable.width() / 2;
                //console.log("new tweeneed_y_pos: " + tweeneed_y_pos + "jsonData.partier[active_num].y_placering + 5: " + jsonData.partier[active_num].y_placering + 5 + "koordinatsystem_size / 10: " + koordinatsystem_size / 10)



                $(".MsgBox_bgr").click(function() {

                    $(".koordinatsystem_container").css("height", koordinatsystem_size + "px");
                    //ui.draggable.css("left", (tweeneed_x_pos - ui.draggable.width() * spacer) + "px").css("top", tweeneed_y_pos + "px");

                    $(active).animate({

                        top: tweeneed_y_pos + "px"

                    }, 500, function() {
                        $(active).removeClass("glow");
                    });

                    $(".draggable").fadeOut(600, function() {
                        $(".draggable").eq(0).remove();



                        var rand_tal = Math.floor(Math.random() * randomize_Array.length);
                        runde = randomize_Array[rand_tal];
                        spacer++;

                        randomize_Array.splice(rand_tal, 1); //, item1, ....., itemX)

                        console.log(runde + ", " + jsonData.partier.length);
                        if (runde < jsonData.partier.length) {
                            make_card();
                        } else {

                            /*----------  Slutfeedback  ----------*/

                            $(".interface_header").html("Du er færdig med opgaven.");
                            $(".draggable_container").html("");
                            //ttr("src", );
                            $(".interface_txt").html("");

                        }

                        $(".MsgBox_bgr").off("click");

                    });
                });
            } else {  
                if (y_grid < jsonData.partier[active_num].y_placering) {
                    // placering = "Du har placeret partiet for langt oppe (til venstre på den værdipolitiske akse).";   // Ukommenteret af THAN d. 3/5-2018 efter ønske af FR.
                    placering = "Partiet har en mere højreorienteret værdipolitik.";                                     // Tilføjet af THAN d. 3/5-2018 efter ønske af FR.
                } else {
                    // placering = "Du har placeret partiet for langt nede (til højre på den værdipolitiske akse).";     // Ukommenteret af THAN d. 3/5-2018 efter ønske af FR.
                    placering = "Partiet har en mere venstreorienteret værdipolitik.";                                   // Tilføjet af THAN d. 3/5-2018 efter ønske af FR.
                }


                UserMsgBox("body", "<h3><span class='label label-danger'>Forkert</span></h3>" + placering);
                $(".MsgBox_bgr").click(function() {
                    $(active).animate({

                        top: 47 + "%"

                    }, 500, function() {
                        //$(active).removeClass("glow");
                    });
                    ui.draggable.css("height", img_width).css("width", img_width);
                    $(".draggable_container").css("height", img_width).css("width", img_width);
                    ui.draggable.animate({
                        left: "0",
                        top: "0"
                    }, 300, function() {
                        // Animation complete.
                    });
                    $(".MsgBox_bgr").off("click");
                });
            }
        }
        /*=====  End of Section comment block  ======*/




        /*=============================================
        =            'Opgavetype = fri'            =
        =============================================*/



        if (opgavetype == "fri") {
            ui.draggable.appendTo(".koordinatsystem_container");
            ui.draggable.css("top", yPos).css("left", xPos).css("position", "absolute");
            ui.draggable.draggable("destroy"); //("destroy");
            ui.draggable.removeClass("draggable").addClass("draggable_clone");
            setTimeout(function() {
                $(".draggable_clone").draggable({

                    containment: "parent"
                });
            }, 300);

            $(".koordinatsystem_container").css("height", koordinatsystem_size + "px");
            var rand_tal = Math.floor(Math.random() * randomize_Array.length);
            runde = randomize_Array[rand_tal];
            spacer++;

            randomize_Array.splice(rand_tal, 1); //, item1, ....., itemX)

            console.log(runde + ", " + jsonData.partier.length);
            if (runde < jsonData.partier.length) {
                make_card();
            } else {
                /*----------  Slutfeedback  ----------*/
                $(".interface_header").html("Du er færdig med opgaven.");
                $(".draggable_container").html("");
                //ttr("src", );
                $(".interface_txt").html("Du kan nu trække rundt og finjustere partiernes placering.");
            }
        }

        /*=====  End of Section comment block  ======*/

    }

});


function make_card() {

    if (randomize_Array.length == 2) {
        $(".card").removeClass("card_3");
        $(".card").addClass("card_2")
    } else if (randomize_Array.length == 1) {
        $(".card").removeClass("card_2");
        $(".card").addClass("card_1")
    } else if (randomize_Array.length == 0) {
        $(".card").removeClass("card_1");
        $(".card").addClass("card_0")
    };

    $(".koordinatsystem_size").html("Console: Runde " + runde + "<br/>Koordinatsystem_size: " + koordinatsystem_size);

    //console.log("RC: " + random_card);

    $(".interface_header").html(jsonData.partier[runde].Partinavn);
    $(".draggable_container").append("<img src='" + jsonData.partier[runde].pic + "'id= 'drag_" + runde + "' class='draggable' />");
    //ttr("src", );

    if (opgavetype == "fordeling") {
        $(".interface_txt").html(jsonData.partier[runde].f_politik);
    }
    if (opgavetype == "værdi") {
        $(".interface_txt").html(jsonData.partier[runde].v_politik);
    }

    $('.draggable').draggable({
        containment: $(".container-fluid"),

        revert: function(is_valid_drop) {
            console.log("is_valid_drop = " + is_valid_drop);

            if (!is_valid_drop) {
                $(this).css("height", img_width).css("width", img_width);
                $(".draggable_container").css("height", img_width).css("width", img_width);

                return true;
            } else {

            }
        },
        drag: function() {
            var offset = $(this).offset();
            xPos = offset.left - $(".koordinatsystem_container").offset().left;
            yPos = offset.top - $(".koordinatsystem_container").offset().top;
            $(this).css("height", koordinatsystem_size / size_multiplier + "px").css("width", koordinatsystem_size / size_multiplier + "px"); //.css("cursor", "webkit-grabbing");
            $(this).addClass("grabbing");
            $('#posX').text('x: ' + xPos);
            $('#posY').text('y: ' + yPos);
            //console.log('height: ' + $(this).height())

            //console.log($(".koordinatsystem_container").height());

            if (opgavetype == "værdi" && over == true) {

                setTimeout(function() {

                    $(".glow").css("top", yPos);
                }, 100);

                //tweeneed_y_pos = (koordinatsystem_size / 10) * (parseFloat(jsonData.partier[active_num].y_placering) + 5) - ui.draggable.width() / 2;
            }
        },
        start: function() {
            $(".microhint").fadeOut(500);
        }
    });
    $(".draggable").click(function() {
        var indeks = $(this).attr("id")[5]; //(".draggable")
        //alert(indeks);
        if (indeks) {
            microhint($(this), "<h4>" + jsonData.partier[indeks].Partinavn + "</h4>" + jsonData.partier[indeks].f_politik);
        }
        console.log(indeks);
    })

    if (opgavetype == "værdi") {

        $(".drag_v").eq(runde).addClass("glow")
    }
}


function info(obj) {
    var indeks = obj.index(".btn_ghost");
    microhint(obj, jsonData.info_tekster[indeks]);
}


/*=====================================================
=            funktioner til værdi politik             =
=====================================================*/
function populate_koordinatsystem() {

    for (var i = 0; i < jsonData.partier.length; i++) {

        $(".koordinatsystem_container").append("<img src='" + jsonData.partier[i].pic + "'id= 'drag_v" + i + "' class='drag_v' />")
        console.log("obj_width: " + obj_width);
        var tweeneed_x_pos = (koordinatsystem_size / 10 * (jsonData.partier[i].x_placering + 5) - $(".drag_v").eq(i).width() / 2);
        //$(".drag_v").eq(i).css("left", tweeneed_x_pos + "px").css("top", 50 + "%");
        $(".drag_v").eq(i).css("height", koordinatsystem_size / size_multiplier + "px").css("width", koordinatsystem_size / size_multiplier + "px"); //.css("cursor", "webkit-grabbing");
        var obj_width = $(".drag_v").eq(0).width() * .5;
        $(".drag_v").eq(i).css("left", (tweeneed_x_pos - obj_width) + "px").css("top", 47 + "%"); //.css("box-shadow", "none");;
    }
}

/*=====  End of funktioner til værdi politik   ======*/

/*==================================================
=            funktioner til fri version            =
==================================================*/
function edit_title() {
    var gml_txt = $(".title_txt").html();

    $(".title_txt").html("<input class='title_input' type='text'></input>");
    $(".title_input").val(gml_txt);
    $(".title_input").focus();
    $(".edit_title").off("click");

    $(".title_input").focusout(function() {
        $(".title_txt").html($(".title_input").val())
        $(".edit_title").click(function() {
            edit_title();
        });
    })
}


/*=====  End of funktioner til fri version  ======*/
