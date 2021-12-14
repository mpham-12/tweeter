$(document).ready(function() {

  $('#tweet-text').on("input", function() {
    const count = this.value.length;

    $(".counter").text(140 - count);
    if (count > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  })
});