/**
 * Created by xiaoxiaosu on 2016/3/29.
 */

reuire('component.less')
var  Backbone = require('backbone');

var View = Backbone.View.extend({
    template:require('./component.html'),
    initialize:function () {
        this.render()
        this.initEvent()
    },
    render:function () {
        this.$el = this.template({'hello':['10',20,30,40,50]})
    }
})

var v = new View()

$("#root").append(v.$el)