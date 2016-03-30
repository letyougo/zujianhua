/**
 * Created by xiaoxiaosu on 2016/3/29.
 */
require('./panel.less')
var  _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');

var View = Backbone.View.extend({
    template : require('./panel.ejs'),
    initialize:function () {
        this.ids = 0
        this.message = new Backbone.Collection()
        this.render()
    },
    render:function () {
        this.$el.html(this.template())
        this.$list = this.$el.find('.JS-pane-list')
        this.listenTo(this.message,'add',this.addItem)
    },


    getItem: function (id) {
        return _.find(this.itemViews, function (view) {
            return id === view.model.get("id");
        });
    },

    addItem : function (model) {
        var that = this
        var item = new ItemView({
            model:model,
        })
        this.itemViews = this.itemViews || []
        this.itemViews.push(item)
        this.$list.append(item.$el)
    },
    removeItem : function (model) {
        var view = this.getItem(model.get('id'))
        view.destroy()
    },
    addMessage:function (text) {
        this.message.add({
            text:text,
            id:this.ids
        })
        this.ids ++
    }
})

var ItemView = Backbone.View.extend({
    template : require('./message-item.ejs'),
    initialize:function () {
        this.render()
    },
    render:function () {
        var data = this.model.toJSON()
        this.$el.html(this.template(data))
    }
})

module.exports = View