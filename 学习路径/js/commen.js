var jkcommen={
    init:function(){
        this.lessImgShow();
        console.log('habe');
    },
    stopEventBubble:function(event){
        var e = event;
        if(e){
            e.stopPropagation();           
        }
    },
    lessImgShow:function(){
        $('.lessonimgbox').bind('mouseover',function(e){
            $(this).find('.img-pop').css('top','0px');
            jkcommen.stopEventBubble(e);
        });
        $('.lessonimgbox').bind('mouseleave',function(e){
            $(this).find('.img-pop').css('top','210px');
            jkcommen.stopEventBubble(e);
        });
    }
}

$(function(){
    jkcommen.init();
})