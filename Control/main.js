$(".button").click(function(){
    const color = $(this).data("color");
    
    const newBlock = $("<div></div>")
        .addClass("block")
        .css("background-color", color);

    $(".container").append(newBlock);

    newBlock.draggable({
        containment: ".container",

        start: function() {
            $(this).css("cursor", "grabbing");
        },
        stop: function() {
            $(this).css("cursor", "grab");
        }
    });
});

$(".reset-btn").click(function() {
    $(".block").remove();
});

$(".reveal-btn").click(
    function(){
        $(".alexa").addClass("show");
        $(".reveal-btn").hide();
});