/**
 * Created by xiaoxiaosu on 2016/3/29.
 */

require('./todo.less')
var  _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');

var Item = require('./todo-item/todo-item')

var View = Backbone.View.extend({
    template : require('./todo.ejs'),
    initialize:function () {
        this.list = new Backbone.Collection()
        this.ids = 0
        this.render()
        this.initEvent()
    },
    render:function () {
        this.$el.html(this.template())
        this.$list = this.$el.find('.JS-todo-list')
        this.$input = this.$el.find('.JS-input')
        this.$add = this.$el.find(".JS-add")
    },
    initEvent : function () {
        var that = this

        this.listenTo(this.list, "add", that.addItem);
        this.listenTo(this.list, "remove", that.removeItem);
   
        this.$input.keydown(function (e) {
            if(e.keyCode == 13){
                that.list.add({
                    id:that.ids,
                    text : that.$input.val()
                })
                that.ids ++
                that.trigger('input-and-add',that.$input.val())
                that.$input.val("")
            }
        })
    },

    getItem: function (id) {
        return _.find(this.itemViews, function (view) {
            return id === view.model.get("id");
        });
    },

    addItem : function (model) {
        var that = this
        var item = new Item({
            model:model,
            list : that.list,
            parent:that
        })
        this.itemViews = this.itemViews || []
        this.itemViews.push(item)
        this.$list.append(item.$el)
    },
    removeItem : function (model) {
        var view = this.getItem(model.get('id'))
        view.destroy()
    }
})

module.exports = View