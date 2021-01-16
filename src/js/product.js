// import './library/jquery.js';
// import { cookie } from './library/cookie.js';

let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        let picture = JSON.parse(res.picture);

        let shang = ` <input type ="number" value ="1" min="1" max="${res.num}" id="num"></input>`
        let temp = `
        <h2>${res.title}</h2>
        <p class="product">${res.details}</p>
        <p style="margin-top: 14px;color: #ff6700;font-size: 14px;">小米自营</p>
        <div class="price">
        <span>${res.price}元</span>
        `;
        let img = `<img  src="${picture[0].src}" alt="">`;
        let cun =
            $('.left-a').prepend(img);
        $('.particulars-right').prepend(temp);
        $('.site-c').prepend(shang);
        if (res.num > 0) {
            $(".site-b").html(`存货为 ${res.num}`);
            $(".love-a a").html("加入购物车");
        } else {
            $(".site-b").html(`该地区暂时缺货`);
            $(".love-a a").html("到货通知");
        }
        // 加入购物车

        let totalli = `<li class="nodeli">碎屏保障服务 <span>159元</span></li>`

        console.log(res);
        console.log(res.title);
        $('#num').change(function() {
            $('.total span').html($(num).val() * res.price + '元')
        })

        // $('.love').on('click', function(ev) {
        //     console.log($(num).val());


        $('.nodeli').detach();
        if ($(ev.target).attr('class') === 'love-a') {
            if ($($('.space-a li .safeguard h3')[0]).attr('class') === 'colo') {
                $('.total li').after(totalli);
                // $('.total-a').html(+res.price + 159);
                if ($(num).val() > 1) {
                    $('.total-a').html($(num).val() * res.price + 159 + '元')
                } else {
                    $('.total-a').html(+res.price + 159);
                }
            }
        }

    });

let totala = `
        <ul>
        <li>${res.title} <span>${res.price}元</span></li>
        </ul>
        <div>总计:<span class="total-a">${res.price}</span></div>
        `
$('.total').prepend(totala)


//碎屏保障服务
let i = 1; $('.space-a li').on('click', function() {

    i++;
    $(this).toggleClass("boder");
    $(this).find('.safeguard h3').toggleClass("colo");
    if (i % 2) {
        $(this).find(".hasApply").prop("checked", false);
    } else {
        $(this).find(".hasApply").prop("checked", true);
    }


}) let i_b = 1; $('.space-b li').on('click', function() {
    i_b++;

    if (i_b % 2) {
        $(this).removeClass("boder");
        $(this).find('.safeguard h3').removeClass("colo");
        $(this).find(".hasApply").prop("checked", false);
    } else {
        $(this).find(".hasApply").prop("checked", true);
        $(this).addClass("boder");
        $(this).find('.safeguard h3').addClass("colo");
    }

    if ($(".space-b li input[name='applymentid']:checked").length > 2) {
        $(this).find(".hasApply").prop("checked", false);
        $(this).find('.safeguard h3').removeClass('colo');
        $(this).removeClass('boder');
    }
})




$('.love-a').on('click', function() {
    addItem(res.id, res.price, $('#num').val());
})
}
});





function addItem(id, price, num) {
    // console.log(id, price, num);
    let shop = cookie.get('shop'); // 获得cookie数据
    let product = {
        id,
        price,
        num
    };

    if (shop) { // 判断购物车是否有添加过数据
        shop = JSON.parse(shop); //将JSON字符串转回数组

        // 判断购物车中是否存在该商品
        if (shop.some(elm => elm.id == id)) {
            // 修改数量
            shop.forEach(el => {
                el.id == id ? el.num = num : null;
            });
        } else {
            shop.push(product);
        }

    } else {
        shop = []; // 初始没有数据 初始化一个空数组
        shop.push(product); // 将第一个商品添加进数组
    }


    cookie.set('shop', JSON.stringify(shop), 1);

}

// -------------------------