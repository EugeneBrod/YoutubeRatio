window.addEventListener ("load", myMain, false);

function myMain (evt) {

  //const title_class = "ytd-video-primary-info-renderer";
  //const title_class = "style-scope";

  const title_class = "h1.title.style-scope.ytd-video-primary-info-renderer";
  var $title = title_class;
  $title = $title.prev()
  console.log($title.text())

  loop();
  //observeDOM(element, myMain)
}

// https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return; 

    if( MutationObserver ){
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe foo for changes in children
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }
    
    // browser support fallback
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()

var loop = function () {
  var likes = document.getElementsByClassName("yt-simple-endpoint style-scope ytd-toggle-button-renderer")
  for (i=0;i<likes.length;i++) {
    if (!isNaN(parseInt(likes[i].innerText[0]))) {
      likesString = likes[i].innerText
    }
  }
  var views = document.getElementsByClassName("view-count style-scope ytd-video-view-count-renderer")
  viewsString = views[0].innerHTML
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
  numberOfViews = parseInt(viewsString.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replaceAll(',',''));
  const ratio = (numberOfLikes/numberOfViews) * 100;
  var dislikes = document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text");
  dislikes[3].innerHTML = "likes/views: " + String(ratio).slice(0, 4) + "%";
}