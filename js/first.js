// 判定鼠标滚轮上下滑事件
// $(document).on("mousewheel ", function (e) {
//     var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1))||
//                   (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
//        console.log(e.originalEvent.wheelDelta);
// })
// 点击览区图片展示弹出框
$('.scenery').on('click',function (){
    // let index = $(this).index();
    // 不能通过index来获得了，需要给每个div一个data-id
    let index = $(this).data('id');
    $.ajax({
        url : '../data.json',
        type : 'get',
        success : res => {
            render(res[index]);
            // $('.model').css({display : 'block'})
            $('.model').fadeIn();
        },
        error : e => {console.log(e)}
    });
})
// 点击x或mask关闭弹出框
$('.model .model-mask').on('click', function (){
    $('.model').css({display : 'none'})
})
// 渲染弹出框数据
function render(data){
    let name = data.name;
    let imgUrl = data.url;
    let decoration = data.decoration;
    let str = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
    <h3>'+ name +'</h3>\
    <img src="./img/scenery'+ imgUrl +'">\
    <p>'+ decoration +' \
    </p>';
    $('.model .model-content').html(str);
    // 不能在外面绑定事件
    // 无法找到该元素来绑定，要在创建的时候给他绑定
    $('.model .model-content .glyphicon-remove').on('click', function (){
        // console.log(1);
        // $('.model').css({display : 'none'}) 
        $('.model').fadeOut();   
    })
}
// 关于我们
$('.about-us').on('click', function (){
    $('.about').animate({left : '0%'},500, 'swing', function(){
        console.log('success');
    });
})
$('#about .glyphicon-menu-left').on('click', function (){
    $(this).parent().animate({left : '-100%'},500, 'swing');
})