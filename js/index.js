// $(document).ready(function() {
//     $('#fullpage').fullpage();
// });
$('#fullpage').fullpage({
    navigation : true,
    navigationTooltips : ['地球','中国','日本','瑞典'],
}); 
//点击地点跳转对应的页面
$('.jp').on('click', function (){
    $.fn.fullpage.moveTo(3,0);
})
$('.zg').on('click', function (){
    $.fn.fullpage.moveTo(2,0);
});
$('.ydl').on('click', function (){
    $.fn.fullpage.moveTo(4,0);
});
$('.ymx').on('click', function (){
    $.fn.fullpage.moveTo(5,0);
})
//地图平移效果
//速率问题，停止后再次开始运动，此时的left不是0到-200，而时间还是不变，导致运动速度变慢
//处理时间与到200的距离应该可以解决
function move (dom){
    let pObj = $(dom).position();    //当前left
    //ul的width,计算-200%到底是多少
    let cWidth = $(dom).width()/2;         // 除以二的话数值应会有问题（js数值不精确导致）会导致最后快到的时候速度飞快
    let nowLeft = pObj.left;
    let time = calTime(nowLeft,cWidth, 8000);  //将计算出的时间赋到动画中
    // console.log(time);
    $(dom).animate({left : '-100%' },time,'linear' ,function (){
        $(this).css({left : 0})
        move(dom);
    })
}
//计算得出最终时间,传入当前的left，以及0到-100所需的时间
function calTime(nowLeft, cWidth,time){
    nowLeft = -nowLeft;
    // console.log(nowLeft,cWidth);
    let v = cWidth / time;
    // console.log(v);
    return (cWidth-nowLeft)/v;  //计算后的时间
}

move('.map-list');

//存在事件捕获，无法解决，无法制作hover到地球就停止，只能hover到positions停止
$('.circle').on('mouseenter', '.positions', function (){
    $(this).css({color : 'skyBlue'});
    $('.map-list').stop();
})
$('.circle').on('mouseleave', '.positions', function (){
    $(this).css({color : '#fff'});
    move('.map-list');
})

// 渲染小人说话的内容
let i = 0;
let sentences = ['呼~这就是银河系了吗', '地球就在前面了耶','去哪里旅游呢？'];
function renderSentence(sentences){
    if(i >= 3) return;
    let sentence = sentences[i++];
    console.log(sentence);
    let str = '<span>'+ sentence +'</span>';
    $('.say').html(str);
    if(i == 1)
    setTimeout( "renderSentence(sentences)", 6000);
    if(i == 2)
    setTimeout( "renderSentence(sentences)", 3000);

}
renderSentence(sentences);