/// <reference path="../../typings/tsd.d.ts" />

import Backbone = require('backbone')

class TodoModel extends Backbone.Model {

    urlRoot = '/api/todos';

    defaults() {
        return {
            content: 'empty todo...',
            done: false
        };
    }

    initialize() {
        if (!this.get('content')) {
            this.set({
                'content': this.defaults().content
            });
        }
    }

    toggle() {
        this.save({
            done: !this.get('done')
        });
    }
}

export = TodoModel