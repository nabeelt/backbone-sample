import './assets/scss/app.scss';
import Backbone from 'Backbone';
import $ from 'jQuery';
import _ from 'underscore';

//Backbone model

var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
})

//Backbone collections

var Blogs = Backbone.Collection.extend({});


//instantiate two blogs

var blog1 = new Blog({
    author: "nabeel",
    title: "title",
    url: "url.com"
});

var blog2 = new Blog({
    author: "arun",
    title: "title",
    url: "arun.com"
});


var blogs = new Blogs();


//views

var BlogView =  Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function(){
        this.template = _.template($('.blogs-list-template').html());
    },
    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
    
});

var BlogsView =  Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function(){
        this.model.on('add',this.render,this);
    },
    render: function(){
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(),function(blog){
            self.$el.append((new BlogView({model: blog})).render().$el);
        })
        return this;
    }
});

var blogsView = new BlogsView();


$(function(){
    $(".add-blog").on("click",function(){
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        });
        blogs.add(blog);
    })
})