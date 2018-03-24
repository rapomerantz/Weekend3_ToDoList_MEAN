let app = angular.module('MyApp', []);

app.controller('ToDoController', ['$http', function ($http) {
    console.log('ToDoController working');
    
    let self = this;
    let taskArray = []; 

    // self.boxChecked = function (value, taskId, taskCompleted) {
    //     if (value === true) {
    //         console.log( value, taskId, taskCompleted );
    //         self.updateCompleted(taskId, taskCompleted); 
    //     } else {
    //         console.log('nope' );
    //         return false; 
    //     }
    // }



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
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal({
                icon: "success",
                text: "Task removed"
              });
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
          });
    }
    
//PUT
    self.updateCompleted = function (taskId, currentCompleteStatus) {
        console.log('Updating taskCompleted');
        $http({
            method: 'PUT', 
            url: '/tasks/' + taskId,
            data: {taskCompleted: currentCompleteStatus = !currentCompleteStatus}
        }).then(function(response){
            console.log('Successfully changed status - response:', response);
            self.getTasks();
        }).catch(function(error){
            console.log('Error in changing status: ', error);
        })
    }




    self.getTasks();  


}]);