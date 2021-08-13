/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // when the page is loaded properly, do the following:

  //1.create tweet element function
  const createTweetElement = (data) => {
    // define variables matching data in the tweets database
    const $username = $('<h2 class = "username">').text(data.user.name);
    const $image = $('<img/>').attr('src', data.user.avatars);
    const $tweetname = $('<h2 class="tweet-name">').text(data.user.handle);
    const $content = $('<p class = "content">').text(data.content.text);
    const $date = $("<span class='dateCreated'>").text(timeago.format(data.created_at));
    const $flag = $('<i class="fas fa-flag flag">');
    const $retweet = $('<i class="fas fa-retweet retweet">');
    const $heart = $('<i class="fas fa-heart heart">');
    //below variables are "structures" components of the html of history tweets
    const $article = $('<article class="tweet">');
    const $header = $('<header>');
    const $profileDiv = $('<div class="profile">');
    const $hr = $('<hr class="line" />');
    const $spanSymbol = $('<span class="symbol">');
    const $footer = $('<footer>');
    // append database variables into structures and append structures into article- the single container for every history tweet.
    $spanSymbol.append($flag, $retweet, $heart);
    $footer.append($date, $spanSymbol);
    $header.append($profileDiv, $tweetname);
    $profileDiv.append($image, $username);
    $article.append($header, $content, $hr, $footer);
    // this func returns the structured history tweets
    return $article;
  }

  // 2.render the structured tweets on the single page app
  const renderTweets = function (tweets) {
    //  when the tweet button is hit, empty posts on the screen before posting the database
    const $allTweets = $('.all-tweets');
    $allTweets.empty();

    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.all-tweets').prepend($tweet);
    }
  };


  // 3.when the submission button is hit:
  const $form = $('#new-post-form');
  $form.on('submit', function (event) {
    // this prevents html to defaultly post to another page
    event.preventDefault();
    // define a variable as the countbutton and a variable to show number of characters input
    const $countButton = $(".counter");
    const tweetNumber = Number($countButton.text())
    // if there is an exsiting error messege, slide it up after hitting submission button
    $('#too-long').slideUp();
    $('#empty').slideUp();
    // show the corresponding error msg when an error occurs
    if (tweetNumber === 140) {
      return $('#empty').slideDown();
    };
    if (tweetNumber < 0) {
      return $('#too-long').slideDown();
    }
    // when the form is submitted, serialize the input
    const serializedData = $(this).serialize();
    // post the serialized data to the database, then fire the loadTweets func to load it in the all-tweets section
    $.post('/tweets', serializedData).then(loadTweets)
    // after hitting submit button, textarea reset to null and countbutton reset to 140
    const $newPostForm = $('#tweet-text');
    $newPostForm.val('')
    $countButton.text(140)
  });

  // create a func to load the tweets from the database
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (posts) => {
        console.log(posts);
        renderTweets(posts);
      },
      error: (err) => {
        console.err(err);
      }
    });
  };
})