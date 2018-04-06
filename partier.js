var koordinatsystem_size = $(".droppable").width();
var size_multiplier = 15;
var runde = 0;



$(document).ready(function() {
    // $("#explanationwrapper").html(explanation(jsonData.userInterface.explanation));      // Udkommenteret af THAN d. 06/12-2017
    // $('.instr_container').html(instruction(jsonData.userInterface.instruktion));         // Udkommenteret af THAN d. 02/01-2018
    $('.instr_container').html(instruction_noLines(jsonData.userInterface.instruktion)); // Tilføjet af THAN d. 02/01-2018.
    $(".koordinatsystem_size").html("Console: <br/>Koordinatsystem_size: " + koordinatsystem_size);
    make_card();

    $(".btn_ghost").click(function() {
        info($(this));
    });

    microhint($(".draggable"), "Træk partiet hen til den rigtige position på fordelingsaksen");

    //populate_koordinatsystem();
});



$(window).resize(function() {
    koordinatsystem_size = $(".droppable").width();
    $(".koordinatsystem_size").html("Console: <br/>Koordinatsystem_size: " + koordinatsystem_size);
    $("#draggable").css("height", koordinatsystem_size / size_multiplier + "px").css("width", koordinatsystem_size / size_multiplier + "px");
    //alert("resize");
});




$(".droppable").droppable({
    accept: ".draggable",

    hoverClass: "drop-hover",
    drop: function(event, ui) {
        console.log("DEN SKAL PLACERES på : " + jsonData.partier[runde].alt_x_placering + "PLA")
        var $newPosX = ui.offset.left - $(this).offset().left;
        var $newPosY = ui.offset.top - $(this).offset().top;

        console.log($newPosX + ", " + $newPosY);

        var x_grid = $newPosX / (koordinatsystem_size - ui.draggable.width());
        var y_grid = $newPosY / (koordinatsystem_size - ui.draggable.height());

        x_grid = (Math.round(x_grid * 10) - 5);
        y_grid = (Math.round(y_grid * 10) - 5);

        $(".partipos").html("x_grid: " + x_grid + ", y_grid: " + y_grid + "<br/>Rounded_X: " + (Math.round(x_grid * 10) - 5) + "<br/>Rounded_Y: " + (Math.round(y_grid * 10) - 5));
        //alert($(".koordinatsystem_container").width() / 10 * (jsonData.partier[runde].x_placering + 5));



        var tweeneed_x_pos = (koordinatsystem_size / 10 * (jsonData.partier[runde].x_placering + 5) - ui.draggable.width() / 2);
        var tweeneed_y_pos = -Math.abs(koordinatsystem_size / 2 + ui.draggable.height() / 2);
        console.log("tweeneed_y_pos: " + tweeneed_y_pos);

        //ui.draggable.css('top', 100);
        //ui.draggable.css('left', $(this).position().left);
        console.log(x_grid + ", INDEXOF:" + jsonData.partier[runde].alt_x_placering.indexOf(x_grid))


        if (jsonData.partier[runde].alt_x_placering.indexOf(x_grid) > -1) {


            console.log("korrekt_placering");
            //var tweeneed_x_pos = ($(this).offset().left + jsonData.partier[runde].x_placering + 5) * koordinatsystem_size;

            UserMsgBox("body", "<h3>Rigtigt placeret</h3><p>Partiet hopper nu på plads i den optimale placering..");
            $("body").click(function() {

                ui.draggable.appendTo(".koordinatsystem_container");
                ui.draggable.css("left", (tweeneed_x_pos - ui.draggable.width() * runde) + "px").css("top", tweeneed_y_pos + "px");

                /* ui.draggable.animate({
                    left: tweeneed_x_pos + "px",
                    top: tweeneed_y_pos + "px"
                }, 3500, function() {
                    // Animation complete.
                });

                */

                ui.draggable.draggable("destroy");
                ui.draggable.css("box-shadow", "none");



                runde++;
                make_card();
                $("body").off("click");

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

            $("body").click(function() {
                ui.draggable.css("height", "60px").css("width", "60px");
                ui.draggable.animate({
                    left: "0",
                    top: "0"
                }, 300, function() {
                    // Animation complete.
                });
                $("body").off("click");
            });



            //        ui.draggable.css("left", "0px").css("top", "0px");
        }
    }

});


function make_card() {
    $(".interface_header").html(jsonData.partier[runde].Partinavn);
    $(".draggable_container").append("<img src='" + jsonData.partier[runde].pic + "'id= 'drag_" + runde + "' class='draggable' />");
    //ttr("src", );
    $(".interface_txt").html(jsonData.partier[runde].f_politik);

    $('.draggable').draggable({

        revert: "invalid",
        drag: function() {
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
            $(this).css("height", koordinatsystem_size / size_multiplier + "px").css("width", koordinatsystem_size / size_multiplier + "px");
            $('#posX').text('x: ' + xPos);
            $('#posY').text('y: ' + yPos);
            console.log('height: ' + $(this).height())

            console.log($(".koordinatsystem_container").height());
        }
    });
    $(".draggable").click(function() {
        var indeks = $(this).index(".draggable")
        if (indeks) {
            microhint($(this), "<h4>" + jsonData.partier[indeks - 1].Partinavn + "</h4>" + jsonData.partier[indeks - 1].f_politik);
        }
        console.log(indeks);
    })
}

function populate_koordinatsystem() {

    for (var i = 0; i < jsonData.partier.length; i++) {
        $(".koordinatsystem_container").append("<img src='" + jsonData.partier[i].pic + "'id= 'drag_v" + i + "' class='draggable drag_v' />")
        var tweeneed_x_pos = (koordinatsystem_size / 10 * (jsonData.partier[i].x_placering + 5) - $(".drag_v").eq(i).width() / 2);
        $(".drag_v").eq(i).css("left", tweeneed_x_pos + "px").css("top", 50 + "%");
    }



}

function info(obj) {
    microhint(obj, "<h4> Fordelingspolitik </h4> Brødtekst om fordelingspolitikken");
}
