$(function() {


   //tabNew history bug 1366*768
   
    $(window).resize(resizeZoom);
    function resizeZoom(){
        if ($(window).width() <=1440) {  //1920*0.75=1440
           $('.main-box-doc-resoure').css('width', '1100px');
           $('.main-box-doc-resoure').css('margin-left', '150px');
        }
    }

    resizeZoom();


    window.onscroll = function() {
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

    $(".quit").click(function() {
        window.location.href = "login.html"
    })


    $(".search-input").focus(function() {
        $(this).parent().find(".search-del").fadeIn();
    }).blur(function() {
        $(this).parent().find(".search-del").fadeOut();
    });

    $(".search-del").click(function() {
        $(".search-input").val("")
    })

    $(".del").on("click", function() {
        // $(".del-confirm-box").show();
        // 
        var $this = $(this);

        $this.showTips({
            callBackSure: function() {
                $this.parents("tr").remove();
                // $.show_msg("数据加载成功");
                // $.successTip("成功信息提示信息")
                $.showLoad("加载页面");
                setTimeout($.hideLoad, 800);
            },
            callBackCancel: function() {
                // $.show_msg("取消删除");
                // $.errorTip("成功信息提示信息")
            }
        });

    })

     $(".left-content-doc-resoure ul li").on("click",function(){
        var $this = $(this);
         $this.addClass("active").siblings("li").removeClass("active");
    })


    $(".platform-update-tab li").each(function(index, item) {
        var $this = $(this),
            posLeft = $this.position().left + 21,
            popoverArrow = $(".arrow");

        if ($this.hasClass('active')) {
            popoverArrow.css("left", posLeft + "px");
        }

        $this.click(function() {
            popoverArrow.css("left", posLeft + "px");
            $this.addClass("active").siblings().removeClass("active");
            $(".update-history").eq(index).addClass("active").siblings(".update-history").removeClass("active");

        })


    })


    $(".platform-update-tab-history li").each(function(index, item) {
        var $this = $(this);
        $this.click(function() {
            $this.addClass("active").siblings().removeClass("active");
            $(".platform-update-history-box").eq(index).addClass("active").siblings(".platform-update-history-box").removeClass("active");
        })
    })

    $(".platform-download .download-flag").click(function() {
        var $this = $(this);
        $this.addClass("active").siblings(".download-flag").removeClass("active");

    })

    $(".platform-download .platform").click(function() {
        var $this = $(this);
        var index = $this.index();
        console.log(index);
        $(".platform-download strong").eq(index).addClass("active").siblings("strong").removeClass("active");
        $this.addClass("active").siblings(".platform").removeClass("active");
    })

    $(".platform-download .platform-doc").click(function() {
        var $this = $(this);
        $this.addClass("active").siblings(".platform-doc").removeClass("active");
    })



    $('.add-textarea,.add-input').focusin(function() {

    }).focusout(function() {
        $(this).removeClass('error');
    });


    $(".sure").on("click", function() {

        if ($("#versionNum").val().length < 1) {
            $("#versionNum").addClass("error");
            $.show_msg("版本号不能为空");
            return;
        }

        if ($("#updateText").val().length < 1) {
            $("#updateText").addClass("error");
            $.show_msg("更新内容不能为空");
            return;
        }

        if ($("#downAdress").val().length < 1) {
            $("#downAdress").addClass("error");
            $.show_msg("下载地址不能为空");
            return;
        }


        //ajax
        location.href = "tabNew.html";

    });

    $(".cancel").on("click", function() {
        location.href = window.history.go(-1);
    })




    // $(".accordion-doc h3").eq(1).addClass("active");
    // $(".accordion-doc ul").hide();

    $(".accordion-doc h3").click(function() {
        $(this).next("ul").slideToggle("slow").siblings("ul:visible").slideUp("slow");
        $(this).toggleClass("active");
        $(this).siblings("h3").removeClass("active");
    })



    //html5 广告上传
    function previewImage(file, box) {
        var MAXWIDTH = 1920;
        var MAXHEIGHT = 350;
        var img = $("." + box).find("img")[0];
        img.onload = function() {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
        }
        var reader = new FileReader();
        reader.onload = function(evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    }

    function clacImgZoomParam(maxWidth, maxHeight, width, height) {
        var param = { top: 0, left: 0, width: width, height: height };
        if (width > maxWidth || height > maxHeight) {
            rateWidth = width / maxWidth;
            rateHeight = height / maxHeight;
            if (rateWidth > rateHeight) {
                param.width = maxWidth;
                param.height = Math.round(height / rateWidth);
            } else {
                param.width = Math.round(width / rateHeight);
                param.height = maxHeight;
            }
        }
        param.left = Math.round((maxWidth - param.width) / 2);
        param.top = Math.round((maxHeight - param.height) / 2);
        return param;
    }

    var addImg = function() {
        var html = '';
        html += ' <div class="resouse-upload-img">'
        html += ' <img src ="" />'
        html += '                       <span class="img-del"></span>'
        html += '</div>'
        return html;
    }

    var addImgFlag = false;
    $(".resouse-upload-btn  input").on("change", function() {
        var box = addImg();

        if (!addImgFlag) {
            $(".resouse-upload-btn").after(box);
        } 

         previewImage($(this)[0], "resouse-upload-img")

        addImgFlag = true;

    })

    $(document).on("click", ".img-del", function() {
        $(".resouse-upload-img").remove();
        addImgFlag = false;
    })



})
