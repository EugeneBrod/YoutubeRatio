
function myMain (evt) {
  // tries main loop every second NUM_ATTEMPT times, logs a timeout if it fails
  var loopUntilGiveUp = function() {
    numAttempts = 0;
    //console.log("STARTING INTERVAL")
    var id = setInterval(function () {
      numAttempts += 1
      //console.log(numAttempts)
      if (numAttempts === 10) {
        clearInterval(id)
        //console.log("failed getting data for like view ratio")
      }
      // extract number of likes
      const like_selector = "yt-formatted-string#text.ytd-toggle-button-renderer"

      var likes = $(like_selector)
      try {
        likesString = likes[0].innerHTML    
      }
      catch {
        //console.log("couldn't find data")
        return
      }
      numberOfLikes = likesString.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0];
      if (!isNaN(numberOfLikes[numberOfLikes.length-1])) {
        numberOfLikes = parseFloat(numberOfLikes)
      } else {
        if (numberOfLikes[numberOfLikes.length-1] == "K") {
          numberOfLikes = parseFloat(numberOfLikes.slice(0,numberOfLikes.length-1)) * 1000
        }
        if (numberOfLikes[numberOfLikes.length-1] == "M") {
          numberOfLikes = parseFloat(numberOfLikes.slice(0,numberOfLikes.length-1)) * 1000000
        }
      }
    
      //extract number of views
      const view_selector = "#container > #info > #info-text > #count"
      try {
        var views = $(view_selector)
        views = views.find("span.view-count")
        viewsString = views.get()[0].innerHTML
        numberOfViews = parseFloat(viewsString.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replaceAll(',',''));
      }
      catch {
        //console.log("couldn't find data")
        return
      }

      // calculate and render ratio
      const ratio = (numberOfLikes/numberOfViews) * 100;
      if ((!isNaN(ratio))) {
        likes[1].innerHTML = "likes/views: " + String(ratio).slice(0, 4) + "%";
      }
      clearInterval(id)
    }, 1000)
  }

  
  var addCustomEventListener = function (selector, event, handler) {
    let rootElement = document.querySelector('body');
    //since the root element is set to be body for our current dealings
    rootElement.addEventListener(event, function (evt) {
            var targetElement = evt.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                  // passing event to loop???
                    handler();
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
  }

  addCustomEventListener('video','loadeddata',loopUntilGiveUp);

}
window.addEventListener ("load", myMain, false);

