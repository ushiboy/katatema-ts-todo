/// <reference path="../../typings/tsd.d.ts" />

import JQuery = require('jquery');
import _ = require('underscore');
import Backbone = require('backbone');
import JST = require('JST');
import TodoModel = require('../models/todo');


class TodoView extends Backbone.View<TodoModel> {

    $input: JQuery;

    tagName: string = 'li';

    template : Function;

    events() {
        return {
            'click .check'              : 'toggleDone',
            'dblclick div.todo-content' : 'edit',
            'click span.todo-destroy'   : 'clear',
            'keypress .todo-input'      : 'updateOnEnter',
            'blur input': 'close'
        };
    }

    initialize() {
        this.template = JST['templates/todo.html'];
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }

    render() : TodoView {
        this.$el.html(this.template(this.model.toJSON()));
        this.$input = this.$('.todo-input');
        return this;
    }

    toggleDone() {
        this.model.toggle();
    }

    edit() {
        this.$el.addClass('editing');
        this.$input.focus();
    }

    close() {
        this.model.save({
            content: this.$input.val()
        }).done(() => {
            this.$el.removeClass('editing');
        });
    }

    updateOnEnter(e: JQueryKeyEventObject) {
        if (e.keyCode == 13) this.close();
    }

    clear() {
        this.model.destroy();
    }
}

export = TodoView;
