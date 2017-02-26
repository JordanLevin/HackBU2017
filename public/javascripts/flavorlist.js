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
        var arr = [];
        $.each(data, function()
        {
            arr.push(this);
            /*tableContent += '<tr class="img-rounded">';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;">' + this.flavor + '</td>';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;">' + this.points + '</td>';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;"><button class = "upvoteFlavor btn btn-primary" rel="' + this._id + '">' +
                '<span class="glyphicon glyphicon-ok"></span></button></td>';
            tableContent += '</tr>';*/
        });
        for(var i = 0;i<arr.length;i++){
            for(var a = 0;a<arr.length-1;a++){
                if(arr[a].points<arr[a+1].points){
                    var temp = arr[a];
                    arr[a] = arr[a+1];
                    arr[a+1] = temp;
                }
            }
        }
        var displayNumbers = true;
        var value = arr.length;
        //check if the page is being rendered by the index or by the flavor thing
        if(document.getElementById("referrer").innerHTML=="true"){
            value = 3;
            displayNumbers = false;

        }

        if(!displayNumbers) {
            tableContent += '<tr>';
            for (var j = 0; j < value; j++) {

                tableContent += '<td style="text-align:center;"><div class = "upvoteFlavor jumbotron col-sm-4" style=" width: 30em; height:30em;" rel="' + arr[j]._id + '">'
                    + arr[j].flavor + '</div></td>';


            }
            tableContent += '</tr>';
        }
        else{
            for(var j = 0;j<value;j++){
                if(j%3==0){tableContent += '<tr>';}
                //tableContent += '<td style="padding-left:8em; padding-right: 8em;">' + arr[j].flavor + '</td>';
                tableContent += '<td style="text-align:center;"><button class = "upvoteFlavor btn btn-primary btn-lg" style=" width: 30em; height:30em" rel="' + arr[j]._id + '">' +
                    arr[j].flavor + ' </button></td>';
                if(j%3==2){tableContent += '</tr>';}
            }
        }
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
        //listFlavors();
    });

}
