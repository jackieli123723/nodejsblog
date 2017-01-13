$(function() {
    function cutString(str, len) {
        //length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + "...";
                }
            } else {
                strlen = strlen + 1;
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + "...";
                }
            }
        }
        return s;
    }

    window.onload = function() {
        var str = document.getElementById('info').innerHTML;
        var s = cutString(str, 285);
        document.getElementById('info').innerHTML = s;
    }

    show_msg.timer = null;

    function show_msg(msg, timeOut) {
        var c = $("#msg_dis_container");
        timeOut = timeOut || 1000;
        if (c.length == 0) {
            $(document.body).append('<div class="motify" style="display:none" id="msg_dis_container"><div class="motify-inner" id="msg_dis_content"></div></div>');
            c = $("#msg_dis_container");
        }
        $("#msg_dis_content").html(msg);
        c.css("display", "block");
        clearTimeout(show_msg.timer);
        show_msg.timer = setTimeout(function() {
            c.css("display", "none");
        }, timeOut);
    }
    jQuery.support.cors = true; //跨越解决数据渲染
    //ajax
    function ajax(url, data, method, oneVisitKey, mutiDealFun) {
        var visitStatus = visitStatus || {};
        data = data || {};
        method = method || "GET";
        var affix = "";
        if (method == "GET") {
            var affix = "?" + $.param($.extend({ '_': new Date().getTime() }, data));
        }
        if (oneVisitKey) {
            if (visitStatus[oneVisitKey]) {
                var deferred = $.Deferred();
                if (mutiDealFun) {
                    mutiDealFun();
                }
                return deferred.promise();
            } else {
                visitStatus[oneVisitKey] = true;
            }
        }


        return $.ajax({
            type: method,
            //GET防止缓存
            crossDomain: true,
            url: url + affix,
            data: method == 'POST' ? (data ? data : null) : null,
            headers: { Accept: "application/json; charset=UTF-8" },
            contentType: "application/x-www-form-urlencoded; application/json; charset=UTF-8"
        }).done(function(res) {
            //todo
        }).fail(function() {
            //todo
        }).always(function() {

            if (oneVisitKey) {
                visitStatus[oneVisitKey] = null;
            }
        });
    }
    window.onscroll = function() {
        scrollMenu();
        var scrollTop = document.body.scrollTop;
        if (scrollTop >= 100) {
            $(".toTop").show();
        } else {
            $(".toTop").hide();
        }
    }
    $(".toTop").click(function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    })

    function scrollMenu() {
        var top = $(document).scrollTop();
        var menu = $("#menu");
        var items = $("#content").find(".item");
        var curId = "";
        items.each(function() {
            var m = $(this);
            var itemsTop = m.offset().top;
            if (top > itemsTop - 140) {
                curId = "#" + m.attr("id");
            } else {
                return false;
            }
        });


        var curLink = menu.find(".cur");
        if (curId && curLink.attr("href") != curId) {
            curLink.removeClass("cur");
            menu.find("[href=" + curId + "]").addClass("cur");
        }
    }


    $("ul li a").click(function() {
        $(this).addClass("cur").parent().siblings().find("a").removeClass("cur");
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 90 + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;

    })

   var hasContent = false;

    $(".doc-bar ul li").each(function(index, item) {
        var $this = $(this),
            posTop = $this.position().top + 19,
            popoverArrow = $(".arrow");
        if ($this.hasClass('active')) {
            popoverArrow.css("top", posTop + "px");
        }
        $this.click(function() {
            if (index == 3) {
                posTop = 415;
            }

            if (index >= 3) {
                 hasContent = true
                $(".doc-bar ul h1").eq(0).removeClass("on");
                $(".doc-bar ul h1").eq(1).addClass("on");
            } else {
                 hasContent = false
                $(".doc-bar ul h1").eq(0).addClass("on");
                $(".doc-bar ul h1").eq(1).removeClass("on");
            }
            popoverArrow.css("top", posTop + "px");
            $this.addClass("active").siblings().removeClass("active");

             if(!hasContent){
                $(".left-content-doc").css("width","100px")
               $(".main-content-doc").css("left","100px")
                
            }else{
                $(".left-content-doc").css("width","300px")
                 $(".main-content-doc").css("left","300px")
            }

        })

       

    })


    $(".search-input").focus(function() {
        $(this).parent().find(".search-del").fadeIn();
    }).blur(function() {
        $(this).parent().find(".search-del").fadeOut();
    });

    $(".search-del").click(function() {
        $(".search-input").val("")
    })


    var monthArr = ["images/jan.png", "images/feb.png", "images/mar.png", "images/apr.png", "images/may.png", "images/jun.png", "images/jul.png", "images/aug.png", "images/sep.png", "images/oct.png", "images/nov.png", "images/dec.png"];
    var cTime = $(".time-box").attr("data-time").split("-");
    var cDay = cTime[2];
    var cMonth = cTime[1];
    console.log(cDay);
    console.log(cMonth);
    var daySrc = "images/" + cDay + ".png";
    var monthSrc;

    for (var i = 1; i <= monthArr.length; i++) {
        if (cMonth == i) {
            monthSrc = monthArr[i - 1];
        }
    }

    $(".time-box").find(".day img").attr("src", daySrc);
    $(".time-box").find(".month img").attr("src", monthSrc);

    


    // $(window).resize(function() {
    //     var winHeight = $(window).height();
    //     var firtPageH = winHeight - $(".top-content").height() - $(".omsdk-banner").height();
    //     $(".first-page").height(firtPageH);
    // })

    // var winHeight = $(window).height();
    // var firtPageH = winHeight - $(".top-content-doc").height() - $(".omsdk-banner").height();
    // $(".first-page").height(firtPageH);





    $(window).resize(resizeZoomAnmaite);
    function resizeZoomAnmaite(){
        var winHeight = $(window).height();
        var firtPageH = winHeight - $(".top-content").height() - $(".omsdk-banner").height();
        $(".first-page").height(firtPageH);
         $(".section .section-box.section-1").css("margin-top","-210px");

        if ($(window).height() <=800){  //Anmaite
                $(".first-page").height(425);
                $(".section .section-box.section-1").css("margin-top","-184px");
        }
        console.log($(window).height())
    }

    resizeZoomAnmaite();




})
