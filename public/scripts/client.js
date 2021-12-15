/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
            <p>${text}</p>
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

$(document).ready(() => {
  renderTweets(data);
})