let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const PORT = 2345;
const mongoose = require('mongoose');


//MONGOOSE STUFF START
const databaseUrl = 'mongodb://localhost:27017/hadar';
//mongodb connection link
mongoose.connect(databaseUrl);

//check connection yes
mongoose.connection.on('connected', ()=>{
  console.log('connected to mongodb!');
})
//check connection no
mongoose.connection.on('error', (err) => {
  console.log('error connecting to mongodb', err);
})
//MONGOOSE STUFF END


//BODY_PARSER STUFF
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static('server/public'));

//SCHEMA
let Schema = mongoose.Schema;

let taskSchema = new Schema ({
  task: {type: String}, 
  time: {type: Number},
  priority: {type: Number},
  category: {type: String, default: 'general'},
  taskCompleted: {type: Boolean, default: false}
});

let Task = mongoose.model('Task', taskSchema); 

//POST
app.post('/tasks', (req, res) => {
  console.log('in POST, task: ', req.body);
  let taskObject = req.body;
  let newTask = new Task (taskObject); 
  newTask.save((err, savedTask) => {
    if (err) {
      console.log('error in POST: ', err);
      res.sendStatus(500); 
    } else {
      console.log('successfully posted task: ', savedTask);
      res.sendStatus(200); 
    }
  })
})
//END POST

//GET
app.get('/tasks', (req, res) => {
  console.log('recieved GET request')
  Task.find({}, (err, foundTasks) => {
    if(err) {
      console.log('error in GET:', err);
      res.sendStatus(500); 
    } else {
      console.log('successful GET');
      res.send(foundTasks); 
    };
  });
});
//END GET

//DELETE
app.delete('/tasks/:id', (req, res) => {
 let taskId = req.params.id; 
 Task.findByIdAndRemove(taskId, (err, removedTask) => {
    if(err){
      console.log('in err delete', err);
      res.sendStatus(500);
    }else{
        res.sendStatus(200);
    }
 })
})
//END DELETE

//PUT
app.put('/tasks/:id', (req, res) => {
  let taskId = req.params.id; 
  let update = req.body; 
  Task.findByIdAndUpdate(taskId, update, {new: true}, (err, updatedItem) => {
    if(err){
      console.log('PUT error', err);
      res.sendStatus(500);
    }else{
        res.sendStatus(200);
    }
  });
});


//Spin up server
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
  