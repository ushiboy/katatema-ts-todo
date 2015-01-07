import TodosCollection = require('./collections/todos');
import AppView = require('./views/app');

new AppView({
    collection: new TodosCollection()
});
