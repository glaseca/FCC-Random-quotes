var currentQuote = "";
var currentAuthor = "";
var forTweet = "";
var getQuote = function (){
    $.ajax({
      url: "https://api.quotable.io/random",
      method: "GET",
      data: {"filter[orderby]":"rand","filter[posts_per_page]":1,"callback":""},
      cache: false,
      dataType: "json"
    })
    .done(function(msg) {
      currentQuote = msg.content;
      currentAuthor = msg.author;
     $('.box').html("<blockquote class='blockquote'>" + currentQuote + "<footer class='blockquote-footer''>" + currentAuthor + "</footer></blockquote>");
     forTweet = $('#forTweet').html('"' + currentQuote + '" by ' + currentAuthor).text();
    })
   .fail(function() {
      $('.alert-danger').show();
  });
};

var tweetIt = function(){
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(forTweet));  
}

$(document).ready(function() {
  getQuote();
  $('#getQuote').on('click', getQuote);
  $('#tweet').on('click', tweetIt);
});