

var submitButton = document.getElementById('submit');
loginButton.addEventListener('click', function(e){
    window.location.replace("/");
})

$(document).ready(function () {
    $("#submit").click(function () {
       $.post("/request",
          {
             username: "Dan",
             password: "Professional gamer"
          },
          function (data, status) {
             console.log(data);
          });
    });
 });