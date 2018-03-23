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
            self.getTasks();  
        }).catch(function(response) {
            console.log('failed POST', response);
        })
    }
    self.getTasks = function () {
        console.log('in getTasks');
        $http( {
            method: 'GET', 
            url: '/tasks'
        }).then(function (response) {
            self.taskArray = response.data; 
            console.log('successful GET, taskArray: ', self.taskArray);
        }).catch(function(response) {
            console.log('error in GET', response);
        })
        
    }

    self.getTasks();  


}]);