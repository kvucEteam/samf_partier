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
    } else if (opgavetype == "fri") {
        $('.instr_container').html(instruction_noLines(jsonData.userInterface.instruktion_fri)); // Tilføjet af THAN d. 23/05-2018.
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

    // randomize_Array = [0,1,3,5]; // Aktiver til test af placering ift af yderpositioner.

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
        } else if (opgavetype == "fri") {
            // UserMsgBox("body", "<h3>Hvilke kriterier placerer vi partierne ud fra?</h3><p>Placeringen af partierne på den fordelingspolitiske og den værdipolitiske akse er siden 1995 foretaget ud fra svarene på nogle spørgsmål, der er udvalgt af politologen Ole Borre. De centrale spørgsmål som partier og personer bliver spurgt om i forhold til fordelingspolitik er: <ol><br/><li>Bør folk i højere grad kunne klare sig selv uden overførsler (for eksempel kontanthjælp eller dagpenge) end tilfældet er i dag? </li><br/><li>Skal indtægter beskattes mere eller mindre end de bliver i dag? </li><br/><li>Er indkomstforskellene og forskellene i levestandard i Danmark for store eller for små? </li><br/><li>Skal virksomhederne i højere grad selv have lov til at ordne deres forretninger, eller er det fint at staten går ind og regulerer dem?</li><br/></ol> De centrale spørgsmål som partier og personer bliver spurgt om i forhold til værdipolitik er: <ol><br/><li>Udgør indvandring alvorlig trussel mod vores nationale egenart?</li><br/><li>Bør den økonomiske vækst sikres gennem en udbygning af industrien, også selvom det kommer i strid med miljøinteresser</li><br/><li>Bør voldsforbrydelser straffes langt hårdere end i dag?</li><br/><li>Bruger det offentlige for mange penge, passende eller for få penge på ulandsbistand?</li><br/></ol>");
            UserMsgBox("body", "<h3>Hvilke kriterier placerer vi partierne ud fra?</h3><p>Placeringen af partierne på den fordelingspolitiske og den værdipolitiske akse er siden 1995 foretaget ud fra svarene på nogle spørgsmål, der er udvalgt af politologen Ole Borre. De centrale spørgsmål som partier og personer bliver spurgt om i forhold til fordelingspolitik er: <br><br><ol><li>Bør folk i højere grad kunne klare sig selv uden overførsler (for eksempel kontanthjælp eller dagpenge) end tilfældet er i dag? </li><li>Skal indtægter beskattes mere eller mindre end de bliver i dag? </li><li>Er indkomstforskellene og forskellene i levestandard i Danmark for store eller for små? </li><li>Skal virksomhederne i højere grad selv have lov til at ordne deres forretninger, eller er det fint at staten går ind og regulerer dem?</li></ol> De centrale spørgsmål som partier og personer bliver spurgt om i forhold til værdipolitik er: <br><br><ol><li>Udgør indvandring alvorlig trussel mod vores nationale egenart?</li><li>Bør den økonomiske vækst sikres gennem en udbygning af industrien, også selvom det kommer i strid med miljøinteresser</li><li>Bør voldsforbrydelser straffes langt hårdere end i dag?</li><li>Bruger det offentlige for mange penge, passende eller for få penge på ulandsbistand?</li></ol>");
        }
    })

    $(".btn_ghost").click(function() {
        info($(this));
    });

    if (opgavetype == "værdi") {
        // setTimeout(function(){ 
            populate_koordinatsystem();
            // insertImgOverlay();  // Skal ikke være her!
        // }, 200);
    }

    make_card();

    // setTimeout(function(){  
        if (opgavetype == "fordeling") {
            microhint($(".interface_header"), '<img class="img-responsive" src="img/iconshandanimate.gif"> <br>Træk partiets logo til den rigtige position på den vandrette akse.');
        } else if (opgavetype == "værdi") {
            microhint($(".interface_header"), '<img class="img-responsive" src="img/iconshandanimate.gif"> <br> Partierne er låst fast på den vandrette akse. Træk  partiets logo til den rigtige position på den lodrette akse.');
        } else if (opgavetype == "fri") {
            microhint($(".draggable"), '<img class="img-responsive" src="img/iconshandanimate.gif"> <br> Placer partierne på begge akser, som du synes de passer.', true, '#000');
            microhint($(".glyphicon-edit"), 'Her kan du ændre opgavebeskrivelsen, fx "Placer partierne ift. Skattepolitik og miljøpolitik."', true, '#000');
            $('.microhint').addClass('removeHintByClick');
        }
    // }, 2000);

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

                    console.log('.droppable - tweeneed_x_pos: ' + tweeneed_x_pos + ', ui.draggable.width(): ' + ui.draggable.width() + ', spacer: ' + spacer + ', CALC: ' + String(tweeneed_x_pos - ui.draggable.width() * spacer));

                    // ui.draggable.css("left", (tweeneed_x_pos - ui.draggable.width() * spacer) + "px").css("top", tweeneed_y_pos + "px");  // Udkommenteret af THAN d. 17/5
                    // ui.draggable.css("left", (tweeneed_x_pos - ui.draggable.width()*1.1 * spacer) + "px").css("top", tweeneed_y_pos + "px"); // Tilføjet af THAN d. 17/5 - tilføjet en justeringsfaktor på 1.1
                    indset_parti();

                    ui.draggable.removeClass("grabbing");
                    ui.draggable.draggable("disable");
                    ui.draggable.css("box-shadow", "none");



                    var rand_tal = Math.floor(Math.random() * randomize_Array.length);
                    runde = randomize_Array[rand_tal];
                    console.log('.droppable - spacer 1: ' + spacer);
                    spacer++;
                    console.log('.droppable - spacer 2: ' + spacer);

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
                        // $(active).removeClass("glow"); 
                        $(active).removeClass("glow").addClass('answered');
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
            console.log('.droppable - opgavetype: fri');

            //=============  START: Udkommenteret af THAN d. 8/5-2018  ===============
                // ui.draggable.appendTo(".koordinatsystem_container");
                // ui.draggable.css("top", yPos).css("left", xPos).css("position", "absolute");
                // ui.draggable.draggable("destroy"); //("destroy");
                // ui.draggable.removeClass("draggable").addClass("draggable_clone");
                // setTimeout(function() {
                //     $(".draggable_clone").draggable({

                //         containment: "parent"
                //     });
                // }, 300);

                // $(".koordinatsystem_container").css("height", koordinatsystem_size + "px");
                // var rand_tal = Math.floor(Math.random() * randomize_Array.length);
                // runde = randomize_Array[rand_tal];
                // spacer++;

                // randomize_Array.splice(rand_tal, 1); //, item1, ....., itemX)

                // console.log(runde + ", " + jsonData.partier.length);
                // if (runde < jsonData.partier.length) {
                //     make_card();
                // } else {
                //     /*----------  Slutfeedback  ----------*/
                //     $(".interface_header").html("Du er færdig med opgaven.");
                //     $(".draggable_container").html("");
                //     //ttr("src", );
                //     $(".interface_txt").html("Du kan nu trække rundt og finjustere partiernes placering.");
                // }
            //=============  SLUT: Udkommenteret af THAN d. 8/5-2018  ===============

            //=============  START: Tilføjet af THAN d. 8/5-2018  ===============
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
            //=============  SLUT: Tilføjet af THAN d. 8/5-2018  ===============
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

    if (opgavetype == "fri") {   // Tilføjet af THAN d. 8/5-2018
        $(".card").removeClass("card_3 card_2 card_1");
        $(".card").addClass("card_0");
    }

    $(".koordinatsystem_size").html("Console: Runde " + runde + "<br/>Koordinatsystem_size: " + koordinatsystem_size);

    //console.log("RC: " + random_card);

    // $(".interface_header").html(jsonData.partier[runde].Partinavn);                                                                   // Udkommenteret af THAN d. 8/5-2018
    // $(".draggable_container").append("<img src='" + jsonData.partier[runde].pic + "'id= 'drag_" + runde + "' class='draggable' />");  // Udkommenteret af THAN d. 8/5-2018

    // console.log('make_card - jsonData: ' + JSON.stringify(jsonData, null, 4));
    console.log('make_card - runde: ' + runde + ', jsonData.partier[runde].pic: ' );

    if ((opgavetype == "fordeling") || (opgavetype == "værdi")) {   // Tilføjet af THAN d. 8/5-2018
        $(".interface_header").html(jsonData.partier[runde].Partinavn);  
        $(".draggable_container").append("<img src='" + jsonData.partier[runde].pic + "'id= 'drag_" + runde + "' class='draggable' />");
    } 

    if ((opgavetype == "fri") && (typeof(opgavetype_fri) === 'undefined')) {   // Tilføjet af THAN d. 8/5-2018
        window.opgavetype_fri = true;
        for (var trunde in jsonData.partier) {
            $(".draggable_container_fri").append("<img src='" + jsonData.partier[trunde].pic + "'id= 'drag_" + trunde + "' class='draggable' />");
        }
        $('.interface_txt').css({height: 'initial'});
    }
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
                console.log('draggable - revert - true');
                easeRemoval_removeSpacer();
                $(this).css("height", img_width).css("width", img_width);
                $(".draggable_container").css("height", img_width).css("width", img_width);

                return true;
            } else {
                console.log('draggable - revert - false');
                easeRemoval_animateSpacer();

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
            console.log('draggable - start');
            easeRemoval_addSpacer();
            $(".microhint").fadeOut(500);
        }
    });
    $(".draggable").click(function() {
        var indeks = $(this).attr("id")[5]; //(".draggable")
        //alert(indeks);
        if (indeks) {
            if (opgavetype == "fri"){
                // microhint($(this), "<h4>" + jsonData.partier[indeks].Partinavn + "</h4>" + jsonData.partier[indeks].f_politik);
                // microhint($(this), "<h4>" + jsonData.partier[indeks].Partinavn + "</h4>" + microhint_slideToggel_menu([{header:"Læs om partiets fordelingspolitik", content: jsonData.partier[indeks].f_politik}, {header:"Læs om partiets værdipolitik", content: jsonData.partier[indeks].v_politik}]));
                microhint($(this), "<h4>" + jsonData.partier[indeks].Partinavn + "</h4>" + microhintBtnMenu());
                $('.microhint_slideToggel_content').hide();
            } else { // Værdi og fordeling
                microhint($(this), "<h4>" + jsonData.partier[indeks].Partinavn + "</h4>" + jsonData.partier[indeks].f_politik);
            }
        }
        console.log(indeks);
    })

    if (opgavetype == "værdi") {

        $(".drag_v").eq(runde).addClass("glow");
        insertImgOverlay();  
    }
}


function info(obj) {
    var indeks = obj.index(".btn_ghost");
    microhint(obj, jsonData.info_tekster[indeks]);
}


/*=====================================================
=         funktioner til fordelings politik           =
=====================================================*/

// Efter FR ønskede nogle at partier og accept-områderne i koordinatsystemet skulle flyttes/justeres i JSON data, så  opstod der overlap af parti-iconer. 
// Da FR bedømmer partiplaceringen efter populate_koordinatsystem() i "værdi politik", så er koden i populate_koordinatsystem() anvendt som skabelon i 
// indset_parti(). 
function indset_parti() {
    var tweeneed_x_pos = (koordinatsystem_size / 10 * (jsonData.partier[runde].x_placering + 5) - $("#drag_"+runde).width() / 2);
    console.log('indset_parti - tweeneed_x_pos: ' + tweeneed_x_pos + ', koordinatsystem_size: ' + koordinatsystem_size + ', x_placering: ' + jsonData.partier[runde].x_placering + ', width: ' + $("#drag_"+runde).width() / 2);
    $("#drag_"+runde).css('position','absolute').css("height", koordinatsystem_size / size_multiplier + "px").css("width", koordinatsystem_size / size_multiplier + "px"); 
    var obj_width = $("#drag_"+runde).width()*0.1; // Primært til justering i mobil view.
    console.log('indset_parti - obj_width: ' + obj_width);
    $("#drag_"+runde).css("left", (tweeneed_x_pos - obj_width) + "px").css("top", 46 + "%"); 
}

/*=====  End of funktioner til fordelings politik   ======*/


/*=====================================================
=            funktioner til værdi politik             =
=====================================================*/
function populate_koordinatsystem() {

    for (var i = 0; i < jsonData.partier.length; i++) {

        $(".koordinatsystem_container").append("<img src='" + jsonData.partier[i].pic + "'id='drag_v" + i + "' class='drag_v' />"); 
        // var Ttweeneed_x_pos = (koordinatsystem_size / 10 * (jsonData.partier[i].x_placering + 5) - $(".drag_v").eq(i).width() / 2); // COMMENTED OUT 22/5
        $(".drag_v").eq(i).css("height", koordinatsystem_size / size_multiplier + "px").css("width", koordinatsystem_size / size_multiplier + "px"); //.css("cursor", "webkit-grabbing");
        var ow = $(".drag_v").eq(i).width();
        var Ttweeneed_x_pos = ((koordinatsystem_size / 10) * (jsonData.partier[i].x_placering + 5) - (ow / 2));  // VIGTIGT: Denne skal først beregnes efter at ow / obj_width er beregnet!
        var obj_width = $(".drag_v").eq(0).width() * .5;
        $(".drag_v").eq(i).css("left", (Ttweeneed_x_pos ) + "px").css("top", 47 + "%"); //.css("box-shadow", "none");;

        console.log('populate_koordinatsystem - VALUE - koordinatsystem_size: ' + koordinatsystem_size + ', jsonData.partier['+i+'].x_placering: ' + jsonData.partier[i].x_placering + ', $(".drag_v").eq('+i+').width() : ' + $(".drag_v").eq(i).width() + ', size_multiplier: ' + size_multiplier + ', obj_width: ' + obj_width + ', ow: ' + ow + ', Ttweeneed_x_pos: ' + Ttweeneed_x_pos + ', IMG: ' + jsonData.partier[i].pic);  
        console.log('populate_koordinatsystem - TYPE - koordinatsystem_size: ' + typeof(koordinatsystem_size) + ', jsonData.partier['+i+'].x_placering: ' + typeof(jsonData.partier[i].x_placering) + ', $(".drag_v").eq('+i+').width() : ' + typeof($(".drag_v").eq(i).width()) + ', size_multiplier: ' + typeof(size_multiplier) + ', obj_width: ' + typeof(obj_width) + ', ow: ' + typeof(ow) + ', Ttweeneed_x_pos: ' + typeof(Ttweeneed_x_pos));  

    }
}

function insertImgOverlay() {
    $('.imgOverlay').remove();  // Fjern alle tidligere overlays.
    $( '.drag_v' ).each(function( index, element ) {
        if (!$(this).hasClass('glow') && !$(this).hasClass('answered')) { // Giv kun et overlay hvis partibilledet ikke har klasserne "glow" og "answered".
            var p = $(this).position();
            var w = $(this).width();
            var h = $(this).height();
            $(".koordinatsystem_container").append('<div id="overlay_'+index+'" class="imgOverlay" style="position: absolute;"></div>');
            $('#overlay_'+index).css({position: 'absolute', width: w, height: h, left: p.left, top: p.top});
        }
    });
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


// $(document).on('mousedown touchstart', ".draggable", function(event) {  // TLY ønsker sig multiple microhints - her fjernes de to første et efter et ved klik.
//     if (opgavetype == "fri") {
//         var id = $(this).attr('id');
//         console.log('.draggable - X1 - id: ' + id);
//     }
// });

// $(document).on('mouseup touchend', ".draggable", function(event) {  // TLY ønsker sig multiple microhints - her fjernes de to første et efter et ved klik.
//     if (opgavetype == "fri") {
//         var id = $(this).attr('id');
//         console.log('.draggable - X2 - id: ' + id);
//     }
// });

function easeRemoval_addSpacer() {
    if (opgavetype == "fri") {
        var id = $(this).attr('id');
        console.log('.draggable - easeRemoval_addSpacer - id: ' + id);
    }
}

function easeRemoval_removeSpacer() {
    if (opgavetype == "fri") {
        var id = $(this).attr('id');
        console.log('.draggable - easeRemoval_removeSpacer - id: ' + id);
    }
}

function easeRemoval_animateSpacer() {
    if (opgavetype == "fri") {
        var id = $(this).attr('id');
        console.log('.draggable - easeRemoval_animateSpacer - id: ' + id);
    }
}

// [{header:"Læs om partiets fordelingspolitik", content: jsonData.partier[indeks].f_politik}, {header:"Læs om partiets værdipolitik", content: jsonData.partier[indeks].v_politik}]
function microhint_slideToggel_menu(menuData){
    var HTML = '<div class="microhint_slideToggel_menu">';
    for (var n in menuData){
        HTML += '<div><span class="btn btn-xs btn-info">'+menuData[n].header+'</span>'+menuData[n].content+'</div>';
    }
    HTML += '</div>';
    return HTML;
}

function microhintBtnMenu() {
    var HTML = '';
    HTML += '<div class="microhintBtnMenu">';
    HTML +=     '<p>Læs om partiets <span class="microhintBtn btn btn-xs btn-info" data-politik="f_politik">fordelingspolitik</span></p> <p>Læs om partiets <span class="microhintBtn btn btn-xs btn-info" data-politik="v_politik">værdipolitik</span></p>';
    HTML += '</div>';
    return HTML;
}

$(document).on('click touchend', ".microhint", function(event) {  // TLY ønsker sig multiple microhints - her fjernes de to første et efter et ved klik.
    console.log('microhintBtnMenu - microhint CLICKED');

    // inlineMicrohintStyles(this);

    console.log('microhintBtnMenu - microhint XXX - HTML: ' + $(this)[0].outerHTML);
});

$(document).on('click touchend', ".microhintBtn", function(event) {  // TLY ønsker sig multiple microhints - her fjernes de to første et efter et ved klik.
    console.log('microhintBtnMenu - microhintBtn Z CLICKED');
    
    $('body').append($(this).closest('.microhint').attr('id', 'microhint_clone').css('z-index', '99').clone()); 

    $("#microhint_clone").draggable();  // Need to reinitialize draggable event, if the new microhint is to behave like the old one...


// console.log('microhintBtnMenu - .draggable - id: ' + $(this).prop('id') + ', src: ' + $(this).prop('src'));

// if ($(this).prop('id').indexOf('drag_')!==-1) {
//     var imgScr = $(this).prop('src');
//     for (var n in jsonData.partier) {
//         if (imgScr.indexOf(jsonData.partier[n].pic)!==-1) {
//             window.imgDraggbleObj = jsonData.partier[n];
//             console.log('microhintBtnMenu - .draggable - imgDraggbleObj: ' + JSON.stringify(imgDraggbleObj, null, 4));
//             break;
//         }
//     } 
// }


    console.log('microhintBtnMenu - microhintBtn - imgDraggbleObj: ' + JSON.stringify(imgDraggbleObj, null, 4));

    var dataPolitik = $(this).attr('data-politik');
    console.log('microhintBtnMenu - .microhintBtn - dataPolitik: ' + dataPolitik);

    UserMsgBox("body", '<h4>'+((dataPolitik=='v_politik')?'Værdipolitik':'')+((dataPolitik=='f_politik')?'Fordelingspolitik':'')+'</h4>' + imgDraggbleObj[$(this).attr('data-politik')]);
});

$(document).on('click touchend', "#microhint_clone .microhint_close", function(event) {  // TLY ønsker sig multiple microhints - her fjernes de to første et efter et ved klik.
    console.log('microhintBtnMenu - microhint_clone CLICKED');

    $(this).closest('.microhint').remove();
});

$(document).on('click touchend', ".draggable, .draggable_clone", function(event) {  // TLY ønsker sig multiple microhints - her fjernes de to første et efter et ved klik.
    console.log('microhintBtnMenu - .draggable CLICKED');

    console.log('microhintBtnMenu - .draggable - id: ' + $(this).prop('id') + ', src: ' + $(this).prop('src'));

    if ($(this).prop('id').indexOf('drag_')!==-1) {
        var imgScr = $(this).prop('src');
        for (var n in jsonData.partier) {
            if (imgScr.indexOf(jsonData.partier[n].pic)!==-1) {
                window.imgDraggbleObj = jsonData.partier[n];
                console.log('microhintBtnMenu - .draggable - imgDraggbleObj: ' + JSON.stringify(imgDraggbleObj, null, 4));
                break;
            }
        } 
    }
});


/*=====  End of funktioner til fri version  ======*/


