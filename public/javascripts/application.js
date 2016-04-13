console.log("added application js");

$('#input_url').on('submit', function (e) {
  e.preventDefault();
  var url = $('form input').val();
  console.log(url)

  $.ajax({
    url:'/articles',
    type: 'post',
    data: {url: url}
  }, function(data) {
    console.log("im in public/js", "post to articles...")
  })
})

$('#destroy_db').on('click', function(e) {
  e.preventDefault();

  $.ajax({
    url: '/keywords',
    type: 'delete',
  }, function(data) {
    console.log("deleted!")
  })
})