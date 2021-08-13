// when the doc is ready and textarea is clicked:
$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    // caculating the left length of the text
    const $value = $(this).val();
    const length = $value.length;
    const left = 140 - length;
    // pass the left value to the button
    const $countButton = $(".counter");
    $countButton.text(left);
    // when length exceeds 140, add a new class for css purpose;
    const warningButton = $countButton.toggleClass("exceeded", left < 0);
  });
});

