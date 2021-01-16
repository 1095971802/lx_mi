// import './library/jquery.js';
$(function() {
    $("img.lazy").lazyload({ effect: "fadeIn" });

    // 二级菜单
    $('.menu-list li').on('mouseenter', function() {

        switch ($(this).children('a').html()) {
            case '小米手机':
                // console.log(1);
                console.log(this);
                $(this).hover(function() { $(".menu-xlc1").slideDown("slow"); }, function() {
                    $(".menu-xlc1").slideUp("slow");
                })
                break;
            case 'Redmi 红米':
                console.log(2);
                break;
            case '电视':
                console.log(3);
                break;
            case '笔记本':
                console.log(4);
                break;
            case '家电':
                console.log(5);
                break;
            case '路由器':
                console.log(6);
                break;
            case '智能硬件':
                console.log(7);
                break;
        }


    })


    // 倒计时
    $(function() {
        setInterval(function() {
            let now = new Date();
            let futuer = new Date(2021, 2, 5, 18, 0, 0);
            let calculate = futuer - now; // 毫秒值
            let s = calculate / 1000; // 秒
            let hour = parseInt(s % 86400 / 3600); // 计算小时
            let min = parseInt(s % 3600 / 60); // 分钟
            let sec = parseInt(s % 60); //秒
            if (sec < 10) {
                sec = '0' + sec;
            }
            $('.clock-c>span').eq(0).html(hour);
            $('.clock-c>span').eq(1).html(min);
            $('.clock-c>span').eq(2).html(sec);
        }, 1000);
    })



    //菜单栏的显示
    $("#banner_menu_wrap").children().hover(function() {
        $(this).css("background", "#ff6700");
        $(this).children(".banner_menu_content").css("border", "1px solid #F0F0F0").show();
    }, function() {
        $(this).css("background", "none");
        $(this).children(".banner_menu_content").css("border", "0px solid #F0F0F0").hide();
    });
    //轮播
    $(function() {
        var i = 0;
        var big_banner_pic = $("#big_banner_pic");
        var allimg = $("#big_banner_pic li").length;

        function img_change() {
            var img_i = i * -1226 + "px";
            big_banner_pic.animate({ opacity: ".2" }, 100, function() {
                big_banner_pic.css("left", img_i);
                big_banner_pic.animate({
                    opacity: "1"
                }, 100);
            })
        }

        function automatic() {
            i += 1;
            if (i >= allimg) {
                i = 0;
            }
            img_change();
        }
        change_self_time = setInterval(automatic, 3000);
        //轮播上一张下一张图标控制
        $("#big_banner_change_wrap").hover(function() {
            clearInterval(change_self_time);
            $("#big_banner_change_wrap").children().show();
        }, function() {
            change_self_time = setInterval(automatic, 3000);
            $("#big_banner_change_wrap").children().hide();
        })
        $("#big_banner_change_prev").click(function() {
            i += 1;
            if (i >= allimg) {
                i = 0;
            }
            img_change();
        })
        $("#big_banner_change_next").click(function() {
            i -= 1;
            if (i <= 0) {
                i = allimg - 1;
            }
            img_change();
        })
    });

    $.ajax({
        type: "get",
        url: "../../interface/getData.php",
        dataType: "json",
        success: function(res) {
            // console.log(res);
            let temp = '';
            res.forEach((elm, i) => {
                let picture = JSON.parse(elm.picture);

                // console.log(picture[0].src);

                temp += ` <li>
                <a href="../html/xiangqing.html?id=${elm.id}">
                   <div class="imgH">
                   <img  src="${picture[0].src}" alt="">
                   </div>
                   <h3 class="h3-z">${elm.title}</h3>
                   <p class="p-Q">${elm.details}</p>
                   <p class="price">
                       <span>${elm.price}</span>元
                       <span>起步</span>
                   </p>
                    </a>
                    </li>`

            });

            $('.list-b').append(temp);
        }
    });

    // 注册正则
    $('#ljzc').attr("disabled", "disabled");
    let zphone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    let zpassword = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    let zemail = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
    let zusname = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

    $('.phonea').blur(function() {
        if (zphone.test($('.phonea').val())) {
            $('.in0 p').html('true');
        } else {
            $('.in0 p').html('false');
        }

    });
    $('.usname').blur(function() {
        if (zusname.test($('.usname').val())) {
            $('.in1 p').html('true');
        } else {
            $('.in1 p').html('false');
        }

    });
    $('.password').blur(function() {
        if (zpassword.test($('.password').val())) {
            $('.in2 p').html('true');
        } else {
            $('.in2 p').html('false');
        }

    });
    $('.email').blur(function() {
        if (zemail.test($('.email').val())) {
            $('.in3 p').html('true');
        } else {
            $('.in3 p').html('false');
        }

    });
    // 库存
    $('body').on('click', function() {
        if (zusname.test($('.usname').val()) && zpassword.test($('.password').val()) && zphone.test($('.phonea').val()) && zemail.test($('.email').val())) {
            $('#ljzc').removeAttr("disabled");
            let phonea = $('.phonea').val();
            let password = $('.password').val();
            console.log($('.phonea').val());
            window.localStorage.setItem("phone", phonea);
            // window.localStorage.setItem("password", password);
            window.localStorage.setItem("phone1", 13949812216);
            window.localStorage.setItem("password1", 'wzhiaini');

        }
    });

    // $('#ljzc').on('click', function() {
    //     window.location.href = "http://localhost/lx_mi/src/html/";
    // })







    // 登录
    $('.menu-account1').on('click', function() {
        // console.log($('.phone_').val());
        let phone_v = $('.phone_').val();
        let password_v = $('.password_').val();
        // console.log(window.localStorage.getItem("phone1") == phone_v);
        // console.log(window.localStorage.getItem("password1") == password_v);



        if ((window.localStorage.getItem("phone1") == phone_v &&
                window.localStorage.getItem("password1") == password_v) ||
            (window.localStorage.getItem("phone1") == phone_v &&
                window.localStorage.getItem("password1") == password_v)
        ) {
            window.location.href = "./index.html";
        } else {
            window.location.href = "./zhuce.html";
        }


    });


    // 规定导航
    $(window).scroll(function() {
        //当滚动条离开顶部或者滚动值大于0时，返回顶部按钮出现；反之当滚动条回到顶部或滚动值等于0时，按钮隐藏
        if ($(window).scrollTop() > 0) {
            $(".hj").css({ "opacity": "1", "cursor": "pointer" })
        } else {
            $(".hj").css({ "opacity": "0", "cursor": "default" })
        }
    });
    $(".hj").click(function() {
        //点击按钮时，返回顶部，过渡时间为1,秒
        $("html,body").animate({ scrollTop: '0' }, 1000);
        return false;
    })
});