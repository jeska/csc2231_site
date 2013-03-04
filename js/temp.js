$.ajaxSetup({
    cache: false,
});
        
var load_gif = "<img src='imgs/ajax_load.gif' alt='Loading streams...' />";
var groups = {};

$(document).ready(function() {
    initializeStreams();
});

var initializeStreams = function() {
    $('.loading').html(load_gif);
    $.getJSON('groups', function(data) {
        $.each(data.Groups, function(index, group) {
            var id = group.id;            
            var name = group.name;
            groups[id] = group.phones;
            var numPhones = group.phones.ids.length
            $('<div class="stream" id="' + id + '">' +
                name + ': currently streaming from ' + numPhones +
                ' device(s).</div>').click(function() {
                    // $(this).fadeOut('slow');
                    showStreamingPhones(id);
                    $("h2").fadeOut('slow', function() {
                        $(this).html("Select a phone's audio stream:").
                            fadeIn('slow');
                    });
                }).appendTo("#streams");
        });
    });
    $('.loading').remove();
}

var showStreamingPhones = function(id) {
    var selectedStream = groups[id];
    $("#streams").fadeOut('slow', function() {
        $(this).remove();
        $.each(selectedStream.ids, function(index, name) {
            var audio = new Audio("wavs/test.wav");
            $('<div class="phone" id="' + name + '">' + 
                '<img src="imgs/phone.png" />' +
                '<p>Stream #' + (index + 1) + ': ' + name + '</p>' +
                '</div>').click(function() {
                    audio.play();
                }).appendTo("#microphones");
        });
    });
}
