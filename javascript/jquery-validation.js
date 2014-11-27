/*
 * Paul Karcher
 * paulk460@gmail.com
 * Nov 20, 2014
 * Page created as student work for 91.461 GUI Programming I at UMass Lowell
 * Description: javascript used to validate form input using the jquery validation plugin
 */

$(document).ready(function () {
  $("div#tabs").tabs();
  analyseInput();
});

function addTab() {
  var num_tabs = getTabsLength() + 1;

  $("div#tabs ul").append(
          "<li><a href='#tab" + num_tabs + "'>(" + parseInt($("#row-start").val()) +
          " to " + parseInt($("#row-end").val()) + ") * (" + 
          parseInt($("#col-start").val()) + " to " +parseInt($("#col-end").val()) +
          ")</a></li>");
  
  $("div#tabs").append(
          "<div id='tab" + num_tabs + "'>#" + num_tabs + "</div>");
  
  $("div#tabs").tabs("refresh");
}

function getTabsLength() {
  return $("div#tabs ul li").length;
}

function createTable(tabsLength) {
  var strContent = "";

  var rowStart = parseInt($("#row-start").val());
  var rowEnd = parseInt($("#row-end").val());
  var colStart = parseInt($("#col-start").val());
  var colEnd = parseInt($("#col-end").val());

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





function analyseInput()
{
  $("#mult-form").submit(function (event) {
      addTab();
      createTable(getTabsLength());
      
    /*must remove because jquery validation does this already */
    event.preventDefault();

  });
}








/* http://stackoverflow.com/questions/1260984/jquery-validate-less-than */
/*
$.validator.addMethod('lessThanEqual', function (value, element, param) {
  return this.optional(element) || parseInt(value) <= parseInt($(param).val());
}, "The value {0} must be less than {1}");
*/

/*
$('#mult-form').validate({
  rules: {
    crow_start: {
      required: true,
      rangelength: [1, 15],
      lessThanEqual: '#crow_end'
    },
    crow_end: {
      required: true,
      rangelength: [1, 16]
    },
    ccol_start: {
      required: true,
      rangelength: [1, 16]
    },
    ccol_end: {
      required: true,
      rangelength: [1, 16]
    }
  }, // end of rules
  messages: {
    password: {
      required: "Please type the password you'd like to use.",
      rangelength: "Your password must be between 8 and 16 characters long."
    },
    confirm_password: {
      equalTo: "The two passwords don't match."
    }
  }, // end of messages


  submitHandler: function (form) {
    form.submit();
  }
});
*/