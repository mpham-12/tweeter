/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//tweetsObj
const data = [];

//Helper Functions:
const createTweetElement = (tweetData) => {
  const $tweet = $("<article>").addClass('tweet');
  let name = tweetData.user.name;
  let avatar = tweetData.user.avatars;
  let handle = tweetData.user.handle;
  let text = tweetData.content.text;
  let time = timeago.format(tweetData.created_at);

  let tweetHTML = `<header class="tweet-header">
            <div class="img-name">
              <img class="profile-pic" src=${avatar} alt="">
              <p class='header-name'>${name}</p>
            </div>
            <p class='user-handle'>${handle}</p>
          </header>
          <div class='tweet-body'>
            <p>${escape(text)}</p>
          </div>
          <footer class='tweet-footer'>
            <p>${time}</p>
            <span class="icons">
              <i class="fas fa-flag icon"></i>
              <i class="fas fa-retweet icon"></i>
              <i class="fas fa-heart icon"></i>
            </span>
          </footer>`;

  let newTweet = $tweet.append(tweetHTML);
  return newTweet;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const postTweet = createTweetElement(tweet);
    $('.tweet-container').prepend(postTweet);
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// ensure page runs HTML before JS
$(document).ready(function() {
  $('.error-msg').hide();
  //catch submit form
  $('.tweet-form').on('submit', function(event) {
    //prevent form submission

    event.preventDefault();
    //extract tweet value
    const tweetBox = $(this).children('#tweet-text');
    const input = tweetBox.val();
    const submitBtn = $(this).children('.button-counter').children('.tweet-button');
    const counter = $(this).children('.button-counter').children('.counter');


    //validation
    if (!input) {
      $(submitBtn).prop('disabled', true);
      $('#error1').show(() => {
        $('#error1').slideDown(1000)
      });
    }
    if (input.length > 140) {
      $(submitBtn).prop('disabled', true);
      $('#error2').show(() => {
        $('#error2').slideDown(1000)
      });
    } else {
      //create API request using AJAX
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: { text: input }
      })
        .done((results) => {
          loadedtweets();
          $(tweetBox).val('');
          $(counter).val('140');
        })
        .fail((error) => console.log(error))
        .always(() => console.log('request to server done'));
    }
  });

  //displays previous tweets
  const loadedtweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .done((results) => {
        $('.tweet-container').empty();
        renderTweets(results);
      })
      .fail((error) => console.log(error))
      .always(() => console.log('request to server done'));
  }
  loadedtweets();
})