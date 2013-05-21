define(function(require, exports, module) {
    var editor = function(options) {
        var me = this,
            propNames = Object.getOwnPropertyNames(options);
        me.options = {
            'switchMode': true //switchMode为true的情况下进入的是源码模式
        };
        propNames.forEach(function(name) {
            var desc = Object.getOwnPropertyDescriptor(options, name);
            Object.defineProperty(me.options, name, desc);
        })

        me.render(options.container);
    }

    editor.prototype = {
        render: function(container) {
            var me = this,
                container = document.getElementById(container);
            var html = '<!DOCTYPE html>' +
                       '<html xmlns="http://www.w3.org/1999/xhtml">' +
                       '    <head>' +
                       '        <style type="text/css">' +
                       '            body{margin:8px;font-family:sans-serif;font-size:16px;color:#333;background:#FFFFFF;}' +
                       '        </style>' +
                       '    </head>' +
                       '    <body>' +
                       '    </body>' +
                       '</html>';

            container.innerHTML = '<iframe id="editor-iframe" scroll="0" frameBorder="0"></iframe>';
            var doc = container.firstChild.contentWindow.document;
            me.doc = doc;
            doc.open();
            doc.write(html);
            doc.close();
            me.setUp(doc);
        },
        setUp: function(doc) {
            var me = this, options = me.options;
            doc.body.contentEditable = true;
            doc.body.spellcheck = false;
            me.bindEvents();
        },
        bindEvents: function() {
            var me = this;
            $('.topbar').on('click', '.fl', function() {
                var command = $(this).attr('command');
                command && me.execCommand(command);
            })
        },
        execCommand: function(cmd) {
            var me = this, doc = me.doc, options = me.options;
            switch(cmd){
                case 'insertLink' :
                    var createLinkDialog = require('./ui/link-dialog.js').createLinkDialog;
                    createLinkDialog();
                    $('.ui').css({
                        position:'absolute',
                        left: ($(window ).width() - $('.ui').outerWidth())/2,
                        top: ($(window).height() - $('.ui').outerHeight())/2 + $(document).scrollTop()
                    });
                    $('.ui-link').show();
                    $('.ui-link .zbtnok').click(function() {
                        var title = $('#id_title2').val();
                        var link = $('.ui-link .ztxt').eq(0).val();
                        if(title == "") {
                            doc.execCommand(cmd, false, link);
                            me.clearLinkCnt();
                        } else {
                            var anchorHtml = "<a href=" + link + ">" + title + "</a>";
                            doc.execCommand('inserthtml', false, anchorHtml);
                            me.clearLinkCnt();
                        }
                    });
                    break;
                case "insertImage" :
                    $("#upload-image").trigger("click");
                    break;
                case "insertVideo" :
                    break;
                case "html":
                    var textarea = options.textarea, frame = $('editor-iframe'), modeNode = $("#editor .fr span");
                    console.log(options.switchMode);
                    if(options.switchMode) {
                        modeNode.html("进入编辑模式");
                        frame.hide();
                        textarea.show();
                        var source = doc.body.innerHTML;
                        textarea.val(source).focus();
                        options.switchMode = false;
                    } else {
                        modeNode.html("进入源码模式");
                        frame.show();
                        textarea.hide();
                        var html = textarea.val();
                        doc.body.innerHTML = html;
                        options.switchMode = true;
                    }
                    break;
                default :
                    doc.execCommand(cmd, false, "");
                    break;
            }
        },
        clearLinkCnt: function() {
            $(".ui-link").hide();
            $("#id_title2").val("");
            $(".ui-link .ztxt").val("");
        }
    }

    exports.editor = editor;
})