console.log("hello world its eugene from content.js")
document.title = "hi"

var likes = document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text")
likesString = likes.text.getAttribute("aria-label")

var views = document.getElementsByClassName("view-count style-scope ytd-video-view-count-renderer")
viewsString = views[0].innerText

numberOfLikes = parseInt(likesString.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replaceAll(',',''));
numberOfViews = parseInt(viewsString.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replaceAll(',',''));

console.log(numberOfLikes);
console.log(numberOfViews);

const ratio = (numberOfLikes/numberOfViews) * 100;

var dislikes = document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text");
/* var thumbsDown = document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text");
console.log(thumbsDown)
thumbsDown[2].innerText = "RATIO: " */

dislikes[3].innerHTML = "RATIO: " + String(ratio).slice(0, 4) + "%";
