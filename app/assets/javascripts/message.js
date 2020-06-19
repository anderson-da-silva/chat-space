$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main__midle__message" data-message-id=${message.id}>
         <div class="main__midle__message__upper">
           <div class="main__midle__message__upper__name">
             ${message.user_name}
           </div>
           <div class="main__midle__message__upper__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main__midle__message__lower">
           <p class="main__midle__message__lower__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main__midle__message" data-message-id=${message.id}>
         <div class="main__midle__message__upper">
           <div class="main__midle__message__upper__name">
             ${message.user_name}
           </div>
           <div class="main__midle__message__upper__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main__midle__message__lower">
           <p class="main__midle__message__lower__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__midle').append(html);
      $('form')[0].reset();
      $('.main__midle').animate({ scrollTop: $('.main__midle')[0].scrollHeight});
      $('input').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    var last_message_id = $('.main__midle__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__midle').append(insertHTML);
        $('.main__midle').animate({ scrollTop: $('.main__midle')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log("fail");
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

