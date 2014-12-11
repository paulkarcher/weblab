/*
 * Paul Karcher
 * paulk460@gmail.com
 * Nov 20, 2014
 * Page created as student work for 91.461 GUI Programming I at UMass Lowell
 * Description: javascript used to validate form input using the jquery validation plugin
 */

$(document).ready(function ()
{
  $("div#tabs").tabs();
  bindCloseTab();

  /*
   jQuery.validator.setDefaults({
   debug: true,
   success: "valid"
   });
   */

  /* http://stackoverflow.com/questions/1260984/jquery-validate-less-than */

  $.validator.addMethod('lessThanEqual', function (value, element, param)
  {
    return this.optional(element) || parseInt(value) <= parseInt($(param).val());
  }, "The value {0} must be less than {1}");

  $('#mult-form').validate({
    rules: {
      crow_start: {
        required: true,
        digits: true,
        lessThanEqual: crow_end
      },
      crow_end: {
        required: true,
        digits: true
      },
      ccol_start: {
        required: true,
        digits: true,
        lessThanEqual: ccol_end
      },
      ccol_end: {
        required: true,
        digits: true
      }
      /* holding on to this method as a reference for how to use the equalTo method
       * confirm_password: {equalTo: '#password'},
       spam: "required"
       }, //end rules*/
    },
    messages: {
      crow_start: {
        required: "Please supply the number to start the rows at.",
        lessThanEqual: "The starting row number cannot exceed the row ending number."
      },
      crow_end: {
        required: 'Please supply the number for the rows to end at.'
      },
      ccol_start: {
        required: "Please supply the number to start the columns at.",
        lessThanEqual: "The starting column number cannot exceed the columns ending number."
      },
      ccol_end: {
        required: 'Please supply the number for the columns to end at.'
      }
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.next());
    },
    submitHandler: function () {
      success: {
        analyseInput();
      }
    }
  }); // end validate

});

function addTab() {
  var num_tabs = getTabsLength() + 1;

  $("div#tabs ul").append(
          "<li><a href='#tab" + num_tabs + "'>(" + parseInt($("#crow_start").val()) +
          " to " + parseInt($("#crow_end").val()) + ") * (" +
          parseInt($("#ccol_start").val()) + " to " + parseInt($("#ccol_end").val()) +
          ")</a><span class='ui-icon ui-icon-circle-close ui-closable-tab'></span></li>");

  $("div#tabs").append(
          "<div id='tab" + num_tabs + "'>#" + num_tabs + "</div>");

  bindCloseTab();
}

function getTabsLength() {
  return $("div#tabs ul li").length;
}

function createTable(tabsLength) {
  var strContent = "";

  var rowStart = parseInt($("#crow_start").val());
  var rowEnd = parseInt($("#crow_end").val());
  var colStart = parseInt($("#ccol_start").val());
  var colEnd = parseInt($("#ccol_end").val());

  /* include a 1 to allow for the initial number of columns and rows */
  var cols = [1];
  var rows = [];

  strContent += "<div class='multi-table'>" +
          "<table>" +
          "<tr>" +
          "<td>&nbsp</td>";

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

  /* create the initial columns in the table (do not have to be multiplied */
  for (var col = 1; col < cols.length; col++)
  {
    strContent += "<td>" + cols[col] + "</td>";
    console.log(cols[col]);
  }

  /* close the  initial row */
  strContent += "</tr>";

  /* create the rest of the table */
  for (var row = 0; row < rows.length; row++)
  {
    strContent += "<tr>";
    for (var col = 0; col < cols.length; col++)
    {
      strContent += "<td>" + rows[row] * cols[col] + "</td>";
      console.log(cols[col]);
    }
    strContent += "</tr>";
  }

  strContent += "</div>";

  console.log("tabsLength:");
  console.log(tabsLength);
  $("#tab" + tabsLength).html(strContent);
}

function bindCloseTab()
{
  $(".ui-icon-circle-close").on("click", function () {
    /* taken from http://jqueryui.com/tabs/#manipulation */
     var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
  });
  $("div#tabs").tabs("refresh");
}

function analyseInput()
{
  $("#mult-form").submit(function (event)
  {
  });
  addTab();
  createTable(getTabsLength());



  /*must remove because jquery validation does this already */
  //event.preventDefault();
}



