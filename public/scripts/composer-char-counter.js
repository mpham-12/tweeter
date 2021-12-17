$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    const $count = $(this).val().length;
    const $counter = $(this).siblings('.button-counter').children('.counter');

    $counter.text(140 - $count);
    if ($count > 140) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', 'black');
    }
  })
});