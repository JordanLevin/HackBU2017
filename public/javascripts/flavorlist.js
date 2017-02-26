/**
 * Created by jordan on 2/25/17.
 */


$(document).ready(function () {
    listFlavors();
    $('#milkshakeList table tbody').on('click', 'td button.upvoteFlavor', upvoteFlavor);

});


function listFlavors() {

    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/flavorList', function (data) {
        //console.log(data);

        $.each(data, function()
        {
            tableContent += '<tr class="img-rounded">';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;">' + this.flavor + '</td>';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;">' + this.points + '</td>';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;"><button class = "upvoteFlavor btn btn-primary" rel="' + this._id + '">' +
                '<span class="glyphicon glyphicon-ok"></span></button></td>';
            tableContent += '</tr>';
        });

        $('#milkshakeList table tbody').html(tableContent);

    });
};

function upvoteFlavor(){
    console.log('upvoteFlavor');
    $.ajax({
        type: 'POST',
        data: {'id': $(this).attr('rel')},
        url: '/submit-flavor'
    }).done(function(response){
        console.log('done');
        listFlavors();
    });

}
