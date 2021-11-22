var button = document.getElementById('Button')
button.onclick = function() {
  var counter = document.getElementById("Counter")
  var number = parseInt(counter.innerHTML)
  counter.innerHTML = String(number+1)
}