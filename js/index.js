var currentQuote = "";
var currentAuthor = "";
var forTweet = "";
var getQuote = function (){
    $.ajax({
      url: "http://quotesondesign.com/wp-json/posts",
      method: "GET",
      data: {"filter[orderby]":"rand","filter[posts_per_page]":1,"callback":""},
      cache: false,
      dataType: "json"
    })
    .done(function(msg) {
      var regex = /(<([^>]+)>)/ig;
      currentQuote = msg[0].content.replace(regex, "").trim();
      currentAuthor = msg[0].title;
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