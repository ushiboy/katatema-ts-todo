/// <reference path="../../typings/tsd.d.ts" />

import JQuery = require('jquery');
import _ = require('underscore');
import Backbone = require('backbone');
import JST = require('JST');
import TodoModel = require('../models/todo');
import TodosCollection = require('../collections/todos');
import TodoView = require('../views/todo');

class AppView extends Backbone.View<Backbone.Model> {

    collection : TodosCollection;

    statsTemplate: Function;

    input : JQuery;

    events() {
        return {
            'keypress #new-todo': 'createOnEnter',
            'click .todo-clear a': 'clearCompleted'
        };
    }

    initialize() {
        this.setElement($('#todoapp'));
        this.statsTemplate = JST['templates/stats.html'];
        this.input = this.$('#new-todo');
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'all', this.render);
        this.collection.fetch();
    }

    render() : AppView {
        this.$('#todo-stats').html(this.statsTemplate({
            total: this.collection.length,
            done: this.collection.done().length,
            remaining: this.collection.remaining().length
        }));
        return this;
    }

    addOne(todo : TodoModel) {
        var view = new TodoView({
            model: todo,
            tagName: 'li'
        });
        this.$('#todo-list').append(view.render().el);
    }

    addAll() {
        this.collection.each(this.addOne, this);
    }

    createOnEnter(e : JQueryKeyEventObject) {
        if (e.keyCode != 13) return;
        var todo = new TodoModel({
            content: this.input.val(),
            done: false
        });
        todo.save()
        .done(() => {
            this.collection.add(todo);
            this.input.val('');
        });
    }

    clearCompleted(e : JQueryMouseEventObject) {
        e.preventDefault();
        _.each(this.collection.done(), function(todo : TodoModel) {
            todo.destroy();
        });
    }
}

export = AppView;
