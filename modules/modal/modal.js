/**
 * Created by xiaoxiaosu on 2016/3/29.
 */
require('./modal.less')
var  _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');

var View = Backbone.View.extend({
    template : require('./modal.ejs'),
    initialize:function () {
        this.render()
    },
    render:function () {
        this.$el.html(this.template({list:[111,222,333,444]}))
    }
})

module.exports = View