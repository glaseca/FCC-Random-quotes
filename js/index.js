var currentQuote = "";
var currentAuthor = "";
var forTweet = "";
var getQuote = function (){
    $.ajax({
      url: "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
      method: "GET",
      cache: false,
      dataType: "json"
    })
    .done(function(msg) {
      var regex = /(<([^>]+)>)/ig;
      currentQuote = msg[0].excerpt.rendered.replace(regex, "").trim();
      currentAuthor = msg[0].title.rendered;
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
