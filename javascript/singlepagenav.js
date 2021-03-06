/* 
 * Paul Karcher
 * paulk460@gmail.com
 * Nov 4, 2014
 * Page created as student work for 91.461 GUI Programming I at UMass Lowell
 * Description: javascript used for dynamic single page navigation
 */


// Modified code taken from Curran Kelleher's lecture for GUI Programming I

// This script implements simple routing by loading partial HTML files 
// named corresponding to fragment identifiers.
//
// By Curran Kelleher October 2014

// Wrap everything in an immediately invoked function expression,
// so no global variables are introduced.
(function () {

  // Stores the cached partial HTML pages.
  // Keys correspond to fragment identifiers.
  // Values are the text content of each loaded partial HTML file.
  var partialsCache = {};

  // Gets the appropriate content for the given fragment identifier.
  // This function implements a simple cache.
  function getContent(fragmentId, callback)
  {
    // If the page has been fetched before,
    if (partialsCache[fragmentId])
    {
      // pass the previously fetched content to the callback.
      callback(partialsCache[fragmentId]);
    }
    else
    {
      // If the page has not been fetched before, fetch it.
      $.get(fragmentId + ".html", function (content)
      {
        // Store the fetched content in the cache.
        partialsCache[fragmentId] = content;

        // Pass the newly fetched content to the callback.
        callback(content);
      });
    }
  }

  // Sets the "active" class on the active navigation link.
  function setActiveLink(fragmentId)
  {
    $("#navmenu a").each(scanLinks);
    function scanLinks(linkElement)
    {
      var link = $(linkElement);
      pageName = link.attr("href").substr(1);
      
      console.log("linkElement");
      console.log(linkElement);
      console.log("pageName");
      console.log(pageName);
      if (pageName === fragmentId)
      {
        link.attr("class", "active");
      }
      else
      {
        link.removeAttr("class");
      }
    }
  }

  // Updates dynamic content based on the fragment identifier.
  function navigate()
  {
    // Isolate the fragment identifier using substr.
    // This gets rid of the "#" character.
    var fragmentId = location.hash.substr(1);

    // Set the "dynamic-content" div innerHTML based on the fragment identifier.
    getContent(fragmentId, function (content)
    {
      $("#dynamic-content").html(content);
    });

    // Toggle the "active" class on the link currently navigated to.
    setActiveLink(fragmentId);
  }

  // If no fragment identifier is provided, (falsey)
  if (!location.hash)
  {
    // default to #home.
    location.hash = "#about";
  }

  // Navigate once to the initial fragment identifier.
  navigate();

  // Navigate whenever the fragment identifier value changes.
  $(window).bind('hashchange', navigate);
}());
