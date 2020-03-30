const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./model/employee');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// Global variables
const serverPort = 3000;

/************************* Mongoose connection strings go below this line  ***************/

/* const connString = 'mongodb+srv://alsaddig:Husam2010@api-gateway-ox66e.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(connString, {promiseLibrary:require('bluebird'), useNewUrlParser: true})
        .then(() => console.debug('Connection to the MongoDB instance was successful!'))
        .catch((err) => console.debug('MongoDB Error: ' + err.message));
 */
       // var mongoDB = 'mongodb+srv://alsaddig:Husam2010@api-gateway-ox66e.mongodb.net/test?retryWrites=true&w=majority';
        var mongoDB = 'mongodb+srv://admin:admin@cluster0-lcbvb.mongodb.net/test?retryWrites=true&w=majority';
        mongoose.connect(mongoDB, {
          useUnifiedTopology: true, useNewUrlParser: true, promiseLibrary: require('bluebird')
        }).then(() => console.log('connection successful'))
        .catch((err) => console.error(err));


/************************* API routes go below this line ********************/


/********************** Employee API Routes ********************************/
// FindEmployeeById API - an API that's used to retrieve a single employee document from the database
app.get("/api/employees/:empId", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);
    }
  });
});

// FindAllTasks API- an API that's used to retrieve all tasks from the database for a single employee
app.get("/api/employees/:empId/tasks", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, "empId todo done doing", function(err,employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);
    }
  });
});

// CreateTask API - an API that's used to create a new task for a single employee
app.post("/api/employees/:empId/tasks", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      const item = {
        text: req.body.text
      };

      employee.todo.push(item);
      employee.save(function(err, employee) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(employee);
          res.json(employee);
        }
      });
    }
  });
});

// UpdateTask API - an API that's used to update tasks for a single employee
app.put("/api/employees/:empId/tasks", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      employee.set({
        todo: req.body.todo,
        done: req.body.done,
        doing: req.body.doing
      });

      employee.save(function(err, employee) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(employee);
          res.json(employee);
        }
      });
    }
  });
});

// DeleteTask API - an API that's used to delete a specific task for a single employee
app.delete("/api/employees/:empId/tasks/:taskId", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      const todoItem = employee.todo.find(
        item => item._id.toString() === req.params.taskId
      );
      const doneItem = employee.done.find(
        item => item._id.toString() === req.params.taskId
      );
      const doingItem = employee.doing.find(
        item => item._id.toString() === req.params.taskId
      );

      if (todoItem) {
        employee.todo.id(todoItem._id).remove();
        employee.save(function(err, emp1) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(emp1);
            res.json(emp1);
          }
        });
      } else if (doneItem) {
        employee.done.id(doneItem._id).remove();
        employee.save(function(err, emp2) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(emp2);
            res.json(emp2);
          }
        });
      } else if (doingItem) {
        employee.doing.id(doingItem._id).remove();
        employee.save(function(err, emp2) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(emp2);
            res.json(emp2);
          }
        });
      } else {
        console.log("Unable to locate task: ${req.params.taskId}");
        res.status(200).send({
          type: "warning",
          text: "Unable to locate task: ${req.params.taskId}"
        });
      }
    }
  });
});
/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
