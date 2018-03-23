let app = angular.module('MyApp', []);

app.controller('ToDoController', ['$http', function ($http) {
    console.log('ToDoController working');
    
    let self = this;
    let taskArray = []; 

//POST
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
    
//GET
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

//DELETE 
    self.removeTask = function (taskId) {
        console.log('in removeTask');
        $http ({
            method: 'DELETE',
            url: '/tasks/' + taskId,
        }).then(function(response) {
            console.log('sucessfully deleted ', response);
            self.getTasks(); 
        }).catch(function(response) {
            console.log('error in DELETE', response);
        })
    }

//PUT
    self.updateCompleted = function (taskId, currentCompleteStatus) {
        console.log('Updating completed status');
        $http({
            method: 'PUT', 
            url: '/tasks/' + taskId,
            data: {taskCompleted: currentCompleteStatus = true}
        }).then(function(response){
            console.log('Successfully changed status');
            self.getTasks();
        }).catch(function(error){
            console.log('Error in changing status: ', error);
        })
    }




    self.getTasks();  


}]);