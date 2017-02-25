/**
 * Created by jordan on 2/25/17.
 */

function listFlavors() {

    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/completeFlavorList', function (data) {
        console.log(data);
        $.each(data.Milkshakes, function () {
            tableContent += '<tr class="img-rounded">';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;">' + this.Flavor + '</td>';
            tableContent += '<td style="padding-left:8em; padding-right: 8em;"><button class = "vote btn btn-primary" rel="' + this._id + '">' +
                '<span class="glyphicon glyphicon-ok"></span></button></td>';
            tableContent += '</tr>';

        });
        $('#milkshakeList table tbody').html(tableContent);

    });
};

listFlavors();