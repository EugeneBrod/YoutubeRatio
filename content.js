function myMain (evt) {

  var loop = function () {

      // extract number of likes
      const like_selector = "yt-formatted-string#text.ytd-toggle-button-renderer"
      var likes = $(like_selector)
      likesString = likes[0].innerHTML    
      numberOfLikes = likesString.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0];
      if (!isNaN(numberOfLikes[numberOfLikes.length-1])) {
        numberOfLikes = parseInt(numberOfLikes)
      } else {
        if (numberOfLikes[numberOfLikes.length-1] == "K") {
          numberOfLikes = parseInt(numberOfLikes.slice(0,numberOfLikes.length-1)) * 1000
        }
        if (numberOfLikes[numberOfLikes.length-1] == "M") {
          numberOfLikes = parseInt(numberOfLikes.slice(0,numberOfLikes.length-1)) * 1000000
        }
      }
    
      //extract number of views
      const view_selector = "#container > #info > #info-text > #count"
      var views = $(view_selector)
      views = views.find("span.view-count")
      viewsString = views.get()[0].innerHTML
      numberOfViews = parseInt(viewsString.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replaceAll(',',''));

      // calculate and render ratio
      const ratio = (numberOfLikes/numberOfViews) * 100;
      if ((!isNaN(ratio))) {
        likes[1].innerHTML = "likes/views: " + String(ratio).slice(0, 4) + "%";
      }
      /* var dislikes = document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text");
      dislikes[3].innerHTML = "likes/views: " + String(ratio).slice(0, 4) + "%"; */
    }
  loop();

  // Options for the observer (which mutations to observe)
  var config = { attributes: true, childList: true };

  // Callback function to execute when mutations are observed
  var callback = function(mutationsList) {
      loop();
  };

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  const title_class = "#container > h1 > yt-formatted-string";
  var title = $(title_class);

  var targetNode = title[0];
    // Select the node that will be observed for mutations
  //var targetNode = document.getElementById('some-id');

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

}

window.addEventListener ("load", myMain, false);

