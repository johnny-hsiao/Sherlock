$(document).ready(function () {
  // console.log("added application js");

  // $('#input_url').on('submit', function (e) {
  //   e.preventDefault();
  //   var url = $('form input').val();

  //   $.ajax({
  //     url:'/articles',
  //     type: 'post',
  //     data: {url: url}
  //   }, function(data) {
  //     console.log("im in public/js", "post to articles...");
  //   });
  // });
  

  // $('#destroy_db').on('click', function(e) {
  //   e.preventDefault();

  //   $.ajax({
  //     url: '/keywords',
  //     type: 'delete',
  //   }, function(data) {
  //     console.log("deleted!");
  //   });
  // });


  $('#twitter').on('click', function(e) {
    e.preventDefault();
    $tableBody = $('tbody');
    $.getJSON('/twitter/FaisalAlTameemi', { CategoryId: 3 }, function(data) {
      // data.tweets.forEach(function(tweet) {       
      //   $tableBody.append(`<tr><td>${tweet.text}</td></tr>`);
      // });
    });
  });


  var $categories_list = $('#categories_list');
  $.getJSON('/categories', function(data) {
    data.categories.forEach(function (category) {
      console.log("im in the forEach application.js")
      $categories_list.append(`<button class="category">${category.name}</button>`);
    })
  });


  // Add click listener to category button
  $('#categories_list').on('click', function(e) {
    $.get('/twitter/' + e.target.innerHTML + '/scrape_all');
  });


  // var $accounts_list = $('#accounts_list');  
  // $.getJSON('categories/1/accounts', function(data) {
  //   data.accounts.forEach(function (account) {
  //     $accounts_list.append(`<button>${account.screen_name}</button>`);
  //   });
  // });
});