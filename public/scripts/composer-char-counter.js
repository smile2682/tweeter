console.log("Oh hi! r u ready??")


$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    // caculating the left length of the text
    const value = $ (this).val();
    const length = value.length;
    const left = 140 - length;
    // pass the left value to the button
    const countButton = $ (".counter").text(left);
    // when length exceeds 140, add a new class for css purpose;
    const warningButton = $ (".counter").toggleClass("exceeded",left<0);
  })
});
