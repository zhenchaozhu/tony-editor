define(function(require, exports, module) {
    function getSubTitle(ele) {
        var value = ele.val();
        if(/^\d{9}$/.test(value)) {
            ele.val('/n/'+value+'/');
            var news_url = "/api/news/" + value + "/";
            $.ajax({
                type: "GET",
                url: news_url,
                success: function(json) {
                    json = JSON.parse(json);
                    if(json.status == 0) {
                        $("#id_title2").val(json.data.sub_title);
                        show_title_count();
                    }
                    if(json.status == 8) {
                        alert("新闻未抓取，请使用新建新闻的方式来重新抓取");
                    }
                },
                error: function() {
                    alert("连接接口服务发生错误");
                }
            })
        //组图
        } else if(/^\d{6}|\d{8}$/.test(value)) {
            ele.val('/p/'+value+'/');
            var images_url = "/api/proxy/?url=http://t.wcms.m.sohu.com/api/pic/" + value + "/";
            $.ajax({
                type: "GET",
                url: images_url,
                success: function(json) {
                    json = JSON.parse(json);
                    $("#id_title2").val(json.sub_title);
                    show_title_count();
                },
                error: function(json) {
                    alert("连接接口服务发生错误");
                }
            })
        }
    }

    function show_title_count() {
        var count = get_byte_len($('#id_title2').val());
        $('#title_words_count2').html(count);
    }

    function get_byte_len(val){
        var len = 0;
        for(var i=0; i<val.length; i++){
            if(val[i].match(/[^\x00-\xff]/ig)!=null){
                len += 1;
            }
            else{
                len += 0.5;
            }
        }
        return len;
    };

    exports.getSubTitle = getSubTitle;
})