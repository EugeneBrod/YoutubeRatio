var views = "4,245,050,368"
var likes = "23M"

numberOfLikes = likes.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replace(',','');
numberOfViews = views.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replace(',','');

console.log(numberOfLikes);
console.log(numberOfViews);