$(document).ready(function(){

  var secondsAgo = function(date){
    return ((new Date() - date) / 1000).toFixed();
  };

  var userImgs = {
    "shawndrost": "img/shawn.jpg",
    "sharksforcheap": "img/tony.jpg",
    "mracus": "img/marc.jpg",
    "douglascalhoun": "img/doug.jpg",
  };

  var createHtml = function(tweet) {
    return (
      '<div class="tweet">' + 
        '<img class="userImgs" src='+ userImgs[tweet.user] +'>' + '</img>'+ 
        '<span class="user">' + '<a class = "user_timeline" href = "' + tweet.user + '">' + tweet.user + '</a>' + '</span>' + 
        '<div class="timeinfo">' + '<span class="time" data-created-at="' + (tweet.created_at.getTime()) + '">' + secondsAgo(tweet.created_at) + '</span>' +' seconds ago.' + '</div>' + '<br>' +
        '<span class= "message">' + tweet.message +'</span>'+ " " + '<br>' + 
      '</div>'
    );
  };

  var drawTweets = function(tweets) {
    $('#tweets').html('');
    for(var i = tweets.length - 1; i >= 0; i--){
      $("#tweets").append(createHtml(tweets[i]));
    }
  };

  $(document).on('click', 'a.user_timeline', function(e){
    drawTweets(window.streams.users[$(this).attr("href")]);
    e.preventDefault();
  });

  var drawHome = function(){
    drawTweets(window.streams.home);
  };
  $('#home').click(drawHome);
  setTimeout(drawHome, 2000);

  setInterval(function(){
    $('.time').each(function(){
      $(this).html(secondsAgo(+ $(this).data('created-at')));
    });
  }, 1000);

});
