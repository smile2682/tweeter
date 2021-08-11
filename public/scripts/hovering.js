// hover event--to be moved to a seperate file
$( "#heart,#flag,#retweet" ).hover(
  function() {
    $( this ).css("color","#e3ad24" );
  }, function() {
    $( this ).css("color","#4056A1" );
  }
);

$( ".all-tweets" ).hover(
  function() {
    $( this ).css("box-shadow", "5px 10px #80aef2" );
  }, function() {
    $( this ).css("box-shadow", "none" );
  }
);
