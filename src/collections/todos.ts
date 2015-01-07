/// <reference path="../../typings/tsd.d.ts" />

import Backbone = require('backbone')
import TodoModel = require('../models/todo');

class TodosCollection extends Backbone.Collection<TodoModel> {

    model = TodoModel;
    url = '/api/todos';

    done() {
        return this.filter(function(todo) {
            return todo.get('done');
        });
    }

    remaining() {
        return this.filter(function(todo) {
            return !todo.get('done');
        });
    }
}

export = TodosCollection