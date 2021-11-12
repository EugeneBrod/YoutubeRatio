var views = "9,863,281"
var likes = "209,292"

numberOfLikes = likes.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replace(',','');
numberOfViews = views.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })[0].replace(',','');

console.log(numberOfLikes);
console.log(numberOfViews);