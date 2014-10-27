/*
 * Paul Karcher
 * paulk460@gmail.com
 * Oct 26, 2014
 * Page created as student work for 91.461 GUI Programming I at UMass Lowell
 * Description:
 */

// N.B.  This version *does* apply the CSS.
// N.B.  This version *does* apply the CSS.
$(document).ready(function () {
    $("#multi-table td:nth-child(1)").addClass("multiple");
    $("#multi-table tr:nth-child(1)").addClass("multiple");
    analyseInput();
});

function createTable(rowStart, rowEnd, colStart, colEnd) {
    var strContent = "";


    var rowStart = parseInt($("#row-start").val());
    var rowEnd = parseInt($("#row-end").val());
    var colStart = parseInt($("#col-start").val());
    var colEnd = parseInt($("#col-end").val());

    /* include a 1 to allow for the initial number of columns and rows */
    var rows = [1];
    var cols = [];

    strContent += "<table>" +
            "<tr>" +
            "<td>&nbsp</td>";
    "</tr>";

    for (var row = 0; row <= rowEnd - rowStart; row++)
    {
        rows.push(rowStart + row);
    }
    console.log("Rows:");
    console.log(rows.toString());

    for (var col = 0; col <= colEnd - colStart; col++)
    {
        cols.push(colStart + col);
    }
    console.log("Cols:");
    console.log(cols.toString());

    /* create the initial rows in the table (do not have to be multiplied */
    for (var row = 1; row < rows.length; row++)
    {
        strContent += "<td>" + rows[row] + "</td>";
        console.log(rows[row]);
    }

    /* close the  initial row */
    strContent += "</tr>";

    /* create the rest of the table */
    for (var col = 0; col < cols.length; col++)
    {
        strContent += "<tr>";
        for (var row = 0; row < rows.length; row++)
        {
            strContent += "<td>" + cols[col] * rows[row] + "</td>";
            console.log(rows[row]);
        }
        strContent += "</tr>";
    }

    $("#multi-table").html(strContent);

    $("#multi-table tr:nth-child(1)").addClass("multiple");
    
    
    $("#multi-table td:nth-child(1)").addClass("multiple");
    
    









}

function analyseInput()
{
    $("#mult-form").submit(function (event) {
        if (validate())
        {
            createTable();
        }
        event.preventDefault();
    });
}


function validate()
{
    var rowStart = $("#row-start").val();
    var rowEnd = $("#row-end").val();
    var colStart = $("#col-start").val();
    var colEnd = $("#col-end").val();

    /* reset the error stylings to blank */
    $("span[id^='error']").html("");
    $("input").removeClass("error");

    var isValid = true;

    if (parseInt(rowStart) > parseInt(rowEnd))
    {
        $("#row-start").addClass("error");
        $("#error-row-start").html("Starting row value must be less than the ending row value.");
        isValid = false;
    }
    if (parseInt(colStart) > parseInt(colEnd))
    {
        $("#col-start").addClass("error");
        $("#error-col-start").html("Starting column value must be less than the ending column value.");
        isValid = false;
    }

    return isValid;
}
