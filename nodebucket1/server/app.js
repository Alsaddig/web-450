/*

============================================
; Title:  app.js
; Author: Alsaddig Ibrahim
; Date:   march 19 2020

; Description: part of nodebucket
;===========================================
*/
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./model/employee');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../dist/nodebucket1')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket1')));

// Global variables
const port = process.env.PORT || 3000;

/************************* Mongoose connection strings go below this line  ***************/

const connString = 'mongodb+srv://admin:admin@cluster0-lcbvb.mongodb.net/nodebucket?retryWrites=true&w=majority';

mongoose
  .connect(connString, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // ********end the connection
/**
 * API(s)
 */
// *******API is used  - gets single employee from database
app.get("/api/employees/:empId", function(req, res, next) {
  //*******Retrieves documents from mongoDB
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
/**
 * API(s)
 */
// FindAllTasks API- an API that's used to retrieve all tasks from the database for a single employee
app.get("/api/employees/:empId/tasks", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, "empId todo done", function(err,employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);
    }
  });
});

// CreateTask API - an API that's used to create a new task from the database for a single employee
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



// UpdateTask API - an API that's used to update tasks from the database for a single employee
app.put("/api/employees/:empId/tasks", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      employee.set({
        todo: req.body.todo,
        done: req.body.done
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

// DeleteTask used to delete tasks from the database for a single employee
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
 * ******Start / Create Server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`);
}); // ******end Create Server
