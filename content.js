
function myMain (evt) {

  var loop = function () {
      console.log("LOOP")
      // extract number of likes
      const like_selector = "yt-formatted-string#text.ytd-toggle-button-renderer"
      var likes = $(like_selector)
      try {
        likesString = likes[0].innerHTML    
      }
      catch {
        console.log("couldn't find data")
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
        console.log("couldn't find data")
        return
      }


      // calculate and render ratio
      const ratio = (numberOfLikes/numberOfViews) * 100;
      if ((!isNaN(ratio))) {
        likes[1].innerHTML = "likes/views: " + String(ratio).slice(0, 4) + "%";
      }
      /* var dislikes = document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text");
      dislikes[3].innerHTML = "likes/views: " + String(ratio).slice(0, 4) + "%"; */
    }

  loop();
  
  var addCustomEventListener = function (selector, event, handler) {
    let rootElement = document.querySelector('body');
    //since the root element is set to be body for our current dealings
    rootElement.addEventListener(event, function (evt) {
            var targetElement = evt.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    handler(evt);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
  }

  //adding the Event Listeners to all the li tasks
  addCustomEventListener('video','loadeddata',loop);


  /* // Options for the observer (which mutations to observe)
  var config = { childList: true, subtree: true, attributes: true };
  
  // Callback function to execute when mutations are observed
  var callback = function(mutationsList) {
      console.log("callback");
      loop();
  };

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  const video_player_qry = "#container";
  var video_player = $(video_player_qry);
  var targetNode = video_player[0]
  console.log(video_player)

    // Select the node that will be observed for mutations
  //var targetNode = document.getElementById('some-id');

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config); */
}
window.addEventListener ("load", myMain, false);

