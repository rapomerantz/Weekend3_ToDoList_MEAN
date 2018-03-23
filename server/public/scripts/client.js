let app = angular.module('MyApp', []);

app.controller('ToDoController', ['$http', function ($http) {
    console.log('ToDoController working');
    
    let self = this;
    let taskArray = []; 

    self.addTask = function (newTask) {
        console.log("in addTask: ", newTask);
        $http({
            method: 'POST',
            url: '/tasks',
            data: newTask
        }).then(function(response) {
            console.log('successful POST', response)
        }).catch(function(response) {
            console.log('failed POST', response);
        })
    }




}]);