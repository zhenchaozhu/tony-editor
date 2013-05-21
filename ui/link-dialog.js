define(function(require, exports, module) {
    var ele = $('<div class="ui zbwin ui-link nbwinautoheight" style="display: none; "></div>'),
        getSubTitle = require('../util.js').getSubTitle;
    var linkHtml = '<div class="nbwinwrap">\n\
						<div class="zcls zflg" title="关闭">\n\
							<div class="txtclose">×</div></div>\n\
							<div class="ztbr noselect zflg zmov">\n\
							<div class="zttl thide zflg">插入链接</div>\n\
						</div>\n\
						<div class="zcnt zflg">\n\
							<div class="">\n\
								<form class="zfom" onsubmit="return false;">\n\
								    <div class="zln">\n\
										<label for="id-20997527-1">链接　</label>\n\
										<input class="ztxt" type="text" id="link" name="id-20997527-1" value="" style="width:260px;">\n\
										<span id="cure_sub_title" style="cursor:pointer;">抓取短标题</span>\n\
									</div>\n\
									<div class="zln" style="">\n\
										<label style="float:left;">标题　</label>\n\
										<div class="newright bg24text" style="display:inline-block; margin-left:5px; background:url(./images/bg24.gif) 0px 0px no-repeat!important;">\n\
                                            <input type="text" size="60" value="" name="title" id="id_title2">\n\
                                            <p>最多输入24.5个字符，已输入<span class="red" id="title_words_count2">0</span>个字符</p>\n\
                                        </div>\n\
									</div>\n\
									<div class="zact">\n\
										<input class="zbtn zbtnok" type="button" value="确定" name="id-20997527-a">\n\
										<input class="zbtn zbtncc" type="button" value="取消" name="id-20997527-b">\n\
									</div>\n\
								</form>\n\
							</div>\n\
						</div>\n\
					</div>';

    function createLinkDialog() {
        ele.html(linkHtml);
        console.log(ele);
        $("body").append(ele);
        $("#link").on("blur", function() {
            getSubTitle($(this));
        })
        $("#cure_sub_title").on("click", function() {
            getSubTitle($(this));
        })
    }

    exports.createLinkDialog = createLinkDialog;
})