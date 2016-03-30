/**
 * Created by xiaoxiaosu on 2016/3/29.
 */
var  _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');


window.root = {
    $doc : $("#root")    
}

var todo = require('modules/todo/todo.js'),
    panel = require('modules/panel/panel.js')
var View = Backbone.View.extend({
    initialize:function () {
        this.render()
        this.initEvent()
    },
    render : function () {

        this.todo = new todo
        this.panel= new panel
        root.$doc.append(this.todo.$el)
        root.$doc.append(this.panel.$el)
    },
    
    initEvent:function () {
        var that = this
        this.listenTo(this.todo,'input-and-add',function (text) {
            that.panel.addMessage('你输入了 '+text + ' 并且增加了一个item ('+text+")")
        })
        this.listenTo(this.todo,'delete',function (text) {
            that.panel.addMessage('你刚刚删除了 item ('+text+")")
        })
        this.listenTo(this.todo,'start-edit',function (text) {
            that.panel.addMessage('你正在修改item ('+text+")")
        })
        this.listenTo(this.todo,'end-edit',function (text1,text2) {
            if(text1 == text2){
                that.panel.addMessage('你对 '+text1 + '啥也没修改')
            }else {
                that.panel.addMessage('你吧 '+text1 + "修改成了 "+text2)
            }
        })
    }
})

new View