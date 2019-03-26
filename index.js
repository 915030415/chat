bindEvent();
function bindEvent(){
    $('.btn').on('click',function(){
        var val = $('.inp').val();
        // console.log(val)
         if(val){
             getData(val);
             addDom('my',val);
         }
    });
    $('.inp').on('keyup',function(e){
       if(e.keyCode == 13&& this.value){
             $('.btn').trigger('click');//主动触发btn的click事件；
       }
       
    })
}
function getData(val){
    $.ajax({
        type:'GET',
        url:'http://data.duyiedu.com/api/chat',
        data:{text:val},
        success:function(data){
            var list = typeof data == 'string'? JSON.parse(data):data;
            console.log(list);
            addDom('rabit', list.text);
        },
        error:function(){
            alert('出错');
        }
    });
}
function addDom(who,text){
    if(who == 'my'){
       $('<div class="talk my">\
       <div class="user"></div>\
       <div class="text">'+ text+'</div>\
   </div>').appendTo($('.inner'));
   $('.inp').val('');
    }else{
        $(' <div class="talk rabit">\
        <div class="user"></div>\
        <div class="text">'+text+'</div>\
</div>').appendTo($('.inner'));
    }
    $('.chat-box').scrollTop($('.chat-box').get(0).scrollHeight);
}