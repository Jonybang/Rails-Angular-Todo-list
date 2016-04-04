'use strict';

var app = angular.module('app');

app.factory('Project', ['railsResourceFactory', 'railsSerializer', 'Task', function (railsResourceFactory, railsSerializer, Task) {
    var resource =  railsResourceFactory({
        url: '/api/projects',
        name: 'project',
        serializer: railsSerializer(function () {
            this.exclude('class');
            this.nestedAttribute('tasks');
            this.resource('tasks', 'Task');
        })
    });
    resource.prototype.GetTasks = function () {
        var self = this;
        return resource.$get(self.$url('tasks'), {}, {rootWrapping: false}).then(function (tasks) {
            self.tasks = tasks;
            return tasks;
        });
    };
    resource.prototype.AddTask = function (_options, is_unshift) {
        var self = this;

        var newIndex = self.tasks.length ? self.tasks[0].index - 1 : 0;
        var options = angular.extend({project_id: self.id, index: newIndex}, _options);

        return new Task(options).create().then(function(task){
            if(is_unshift)
                self.tasks.unshift(task);
            else
                self.tasks.push(task);
        });
    };
    return resource;
}]);
app.factory('Task', ['railsResourceFactory', 'railsSerializer', function (railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        url: '/api/tasks',
        name: 'task',
        serializer: railsSerializer(function () {
            this.exclude('class');
        })
    });
}]);

app.factory('Models', ['Project', 'Task',
        function(Project, Task) {
            return {
                Project: Project,
                Task: Task
            };
}]);