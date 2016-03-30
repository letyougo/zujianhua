/**
 * Created by xiaoxiaosu on 2016/3/29.
 */
require('./todo-item.less')
var  _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');

var View = Backbone.View.extend({
    tagName:'li',
    template : require('./todo-item.ejs'),
    initialize:function (option) {
        this.parentList = option.list
        this.parent = option.parent
        this.render()
        this.initEvent()
    },
    render:function () {
        var data = this.model.toJSON()
        this.$el.html(this.template(data))
        this.$remove = this.$el.find('.JS-remove')
        this.$text = this.$el.find('.JS-text')
        this.$input = this.$el.find('.JS-input')
    },
    initEvent:function () {
        var that = this

        this.$el.on('click','.JS-remove',function () {
            that.parentList.remove(that.model)
            that.parent.trigger('delete',that.model.get('text'))
        })
        this.$el.on('click','.JS-text',function () {
            that.parent.trigger('start-edit',that.model.get('text'))
            $(this).hide()
            that.$input.show()
        })

        this.$el.on('keydown','.JS-input',function (e) {
            if(e.keyCode == 13){
                that.$text.show()
                that.$input.hide()
                that.parent.trigger('end-edit',that.model.get('text'),$(this).val())
                that.model.set('text',$(this).val())
                
                that.render()
            }
        })

    },
    destroy:function () {
        this.remove()
    }
})

module.exports = View