$.ajaxSetup({
    cache: false,
});
        
var load_gif = "<img src='imgs/ajax_load.gif' alt='Loading streams...' />";
var sessions = [];
var streams = {};

$(document).ready(function() {
    initializeStreams();
});

var initializeStreams = function() {
    $('.loading').html(load_gif);
    $.getJSON('sessions', function(data) {
        sessions = data["Streams"];
        var items = [];

        $.each(sessions, function(index, stream) {
            var id = stream["id"];            
            var name = stream["name"];
            streams[id] = stream["phones"];
            var numPhones = streams[id]["ids"].length
            $('<div class="stream" id="' + id + '">' +
                name + ': currently streaming from ' + numPhones +
                ' device(s).</div>').click(function() {
                    $(this).fadeOut('slow');
                }).appendTo("#changethis");
        });
    });
    $('.loading').hide();
}
