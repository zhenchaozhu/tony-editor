define(function(require, exports, module) {
    var editor = function(options) {
        var me = this,
            propNames = Object.getOwnPropertyNames(options);
        me.options = {};
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
            doc.open();
            doc.write(html);
            doc.close();
            me.setUp(doc);
        },
        setUp: function(doc) {
            var me = this, options = me.options;
            doc.body.contentEditable = true;
            doc.body.spellcheck = false;
        },
        execCommand: function(cmdName) {
            
        }
    }

    exports.editor = editor;
})