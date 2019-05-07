//
$.fn.UiSearch = function(){
    var ui = $(this);
    $('.ui-search-selected',ui).on("click",function(){
        $('.ui-search-selected-list').show();
        return false;
    });
    $('ui-search-select-list a',ui).on("click",function(){
        $('.ui-search-selected').text($(this).text);
        $('.ui-search-selected-list').hide();
        return false;
    });
    $('body').on("click",function(){
        $('.ui-search-selected-list').hide();
    });
}

/*
*@param {string} header    tab组价的选项阿卡切换部分classname，里面有若干个item的class
*@param {string}  content tab组件的内容区域部分的classname，里面有若干个item的class
*@param {string} focus_prefix 选项卡高亮样式前缀，可选
*/
$.fn.UiTab = function(header,content,focus_prefix){
    var ui = $(this);
    var tabs = $(header,ui);
    var cons = $(content,ui);
    var prefix = focus_prefix||'';

    tabs.on('click',function(){
        var index = $(this).index();
        tabs.removeClass(prefix +'item_focus').eq(index).addClass(prefix +'item_focus');
        cons.hide().eq(index).show();
        console.log(index);
        return false;
    });
    
}

//ui-backTop
$.fn.UiBackTop = function(){
    var ui = $(this);
    var el = $('<a href="#" class="ui-BackTop">')
    ui.append(el);
    var scrollHeight = $(window).height();
    
    $(window).on('scroll',function(){
        el.show();
    });
    el.on('click',function(){
        $(window).scrollTop(0);
    });
}

//1.左右箭头控制翻页
//2.翻页时，focus要联动
//3.翻到第三页，下一页回到第一页
//4.进度点，切换页面
//5.自动滚动
//6.滚动过程中，其他操作不能使用
$.fn.UiSlider = function(){
    var ui = $(this);
    var items = $('.ui-slider-wrap .item',ui);
    var wrap = $('.ui-slider-wrap');
    var btn_prev = $('.ui-slider-arrow .left',ui);
    var btn_right = $('.ui-slider-arrow .right',ui);
    var tips = $('.ui-slider-process .item');
    var intervalId = null;

    //当前页  滑块数 滑块宽度
    var current = 0;
    var size = items.size();
    var width = items.eq(0).width();

    //鼠标悬停时，不要自动滚动

    wrap.on('mouseover',function(){
        clearInterval(intervalId);
    })
    .on('mouseout',function(){
        intervalId = setInterval(function(){
            wrap.triggerHandler('move_next');
        },2000);
    });


    wrap
    .on('move_prev',function(){
        if(current>0)
          current = (current-1)%size;
        else
          current = size-1;
        wrap.css('left',(-1)*width*current+'px');
        tips.removeClass('item_focus');
        tips.eq(current).addClass('item_focus');
    })
    .on('move_next',function(){
        current = (current+1)%size;
        wrap.css('left',(-1)*width*current+'px');
        tips.removeClass('item_focus');
        tips.eq(current).addClass('item_focus');
    })
    .on('move_to',function(event,index){
        wrap.css('left',(-1)*width*index+'px');
        tips.removeClass('item_focus');
        tips.eq(index).addClass('item_focus');
    })
    .on('auto_move',function(){
        intervalId = setInterval(function(){
            wrap.triggerHandler('move_next');
        },2000);
    })
    .triggerHandler('auto_move');



    tips.on('click',function(){
        index = $(this).index();
        current = index;
        wrap.triggerHandler('move_to',index);
    });
    btn_prev.on('click',function(){
        wrap.triggerHandler('move_prev');
    });
    btn_right.on('click',function(){
        wrap.triggerHandler('move_next');
    });

}


$(function(){
    $('body').UiBackTop();
    $('.banner-slider').UiSlider();
    $('.ui-search').UiSearch();
    $('.content-tab').UiTab('.caption > .item','.block > .item');
    $('..content-tab .block .item').UiTab('.block-caption > .block-caption-item','.block-content > .block-wrap','block-caption-');
}); 

