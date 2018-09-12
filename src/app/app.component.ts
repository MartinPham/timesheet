import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  months = [];
  years = [];
  tasks = [];
  suggestTasks = [];

  calendarDate: Date = new Date();
  calendarMonth = 1;
  calendarYear = 2017;
  currentTaskId = -1;
  currentEditTaskId = -1;
  currentEditTask = {
        name: '',
        startedAt: '',
        total: 0
  };
  updateTaskTimeInterval = null;

  clickedDate: Date;
  highlightCurrentDate: (day) => void;

  constructor() {
    this.months = [
      { id: 1, name: 'Jan'},
      { id: 2, name: 'Feb'},
      { id: 3, name: 'Mar'},
      { id: 4, name: 'Apr'},
      { id: 5, name: 'May'},
      { id: 6, name: 'Jun'},
      { id: 7, name: 'Jul'},
      { id: 8, name: 'Aug'},
      { id: 9, name: 'Sep'},
      { id: 10, name: 'Oct'},
      { id: 11, name: 'Nov'},
      { id: 12, name: 'Dec'},
    ];

    for(let i = (new Date()).getFullYear() - 5; i < (new Date()).getFullYear() + 5; i++)
    {
      this.years.push(i);
    }

    this.calendarMonth = this.calendarDate.getMonth() + 1;
    this.calendarYear = this.calendarDate.getFullYear();

    this.highlightCurrentDate = (day): void => {
      if (
        day.date.getDate() == this.calendarDate.getDate() 
        && day.date.getMonth() == this.calendarDate.getMonth() 
        && day.date.getFullYear() == this.calendarDate.getFullYear()
      ) {
        day.cssClass = 'highlight-cell';
      }
    }

    this.pullData();

    this.suggestTasks = this.tasks;

    clearInterval(this.updateTaskTimeInterval);
    this.updateTaskTimeInterval = setInterval(() => { 
      this.updateTaskTimeInterval_Tick(); 
    }, 1000);
  }


  clickMe(x) {
    console.log(x);
    var date = new Date();
    date.setMonth(5);
    this.calendarDate = date;
  }

  monthSelect_Change() {
    var date = new Date();
    date.setMonth(this.calendarMonth - 1);
    this.calendarDate = date;
  }
  yearSelect_Change() {
    var date = new Date();
    date.setFullYear(this.calendarYear);
    this.calendarDate = date;
  }
  addTaskInput_Keypress(event) {
    if(event.keyCode == 13)
    {
      var startedAt = new Date();
      startedAt.setDate(this.calendarDate.getDate());
      startedAt.setMonth(this.calendarDate.getMonth());
      startedAt.setFullYear(this.calendarDate.getFullYear());
      
      var task = {
        id: this.tasks.length + 1,
        name: event.target.value,
        startedAt: startedAt,
        total: 0
      };

      this.tasks.push(task);
      event.target.value = '';
      event.target.blur();
      this.currentTaskId = task.id;

      this.pushData();
    } else {
      this.suggestTasks = this.tasks.filter(item => {
        return item.name.indexOf(event.target.value) > -1
      });
    }
  }
  editTaskNameInput_Keypress(event) {
    if(event.keyCode == 13)
    {
      this.saveTaskButton_Click();
    } else {
      this.currentEditTask.name = event.target.value;
    }
  }
  editTaskStartedAtInput_Keypress(event) {
    if(event.keyCode == 13)
    {
      this.saveTaskButton_Click();
    } else {
      this.currentEditTask.startedAt = event.target.value;
    }
  }
  editTaskTotalInput_Keypress(event) {
    if(event.keyCode == 13)
    {
      this.saveTaskButton_Click();
    } else {
      this.currentEditTask.total = event.target.value;
    }
    
  }
  
  // addTaskButton_Click() {
  //   var startedAt = new Date();
  //   startedAt.setDate(this.calendarDate.getDate());
  //   startedAt.setMonth(this.calendarDate.getMonth());
  //   startedAt.setFullYear(this.calendarDate.getFullYear());
    
  //   var task = {
  //     id: this.tasks.length + 1,
  //     name: this.newTaskName,
  //     startedAt: startedAt,
  //     finishedAt: startedAt
  //   };

  //   this.tasks.push(task);
  //   this.newTaskName = '';
  //   this.currentTaskId = task.id;

  //   console.log(this.tasks);
  // }
  findTaskById(taskId) {
    for(let i in this.tasks)
    {
      if(this.tasks[i].id == taskId)
      {
        return this.tasks[i];
      }
    }
    return null;
  }

  updateTaskTimeInterval_Tick() {
    if(this.currentTaskId > 0)
    {
      var task = this.findTaskById(this.currentTaskId);
      if(!task) return;
      var finishedAt = new Date();
      task.total++;
      this.pushData();
    }
  }

  pushData() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  pullData() {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    if(!this.tasks) {
      this.tasks = [];
      this.pushData();
    }

    for(let i in this.tasks)
    {
      this.tasks[i].startedAt = new Date(this.tasks[i].startedAt);
    }
  }

  startTrackTaskButton_Click(taskId) {
    this.currentTaskId = taskId;
    this.currentEditTaskId = -1;
  }
  stopTrackTaskButton_Click(taskId) {
    this.currentTaskId = -1;
    this.currentEditTaskId = -1;
  }
  deleteTaskButton_Click(taskId) {
    this.currentTaskId = -1;
    this.currentEditTaskId = -1;
    this.tasks = this.tasks.filter(function(item) { 
        return item.id !== taskId;
    });
    this.pushData();
  }
  editTaskButton_Click(taskId) {
    this.currentTaskId = -1;
    this.currentEditTaskId = taskId;
    var task = this.findTaskById(this.currentEditTaskId);
    this.currentEditTask.name = task.name;
    this.currentEditTask.startedAt = task.startedAt;
    this.currentEditTask.total = task.total;

    // var task = this.findTaskById(taskId);
    // var startedAt = prompt("Input start time", task.startedAt);
    // var total = prompt("Input total minute(s)", String(task.total / 60));

    // task.startedAt = new Date(startedAt);
    // task.total = Number(total) * 60;
    // this.pushData(); 
  }
  saveTaskButton_Click() {
    

    var task = this.findTaskById(this.currentEditTaskId);
    task.name = this.currentEditTask.name;
    var timezone = -this.calendarDate.getTimezoneOffset()/60;
    var timezoneString = String(timezone);
    if(timezone > 0) {
      timezoneString = '+' + timezone;
    } else {

    }
    // var dateString = this.calendarDate.getFullYear() + '-' + (this.calendarDate.getMonth() + 1) + '-' + this.calendarDate.getDate() + ' ' + this.currentEditTask.startedAt + ' ' + timezone;
    // console.log(dateString);
    // task.startedAt = new Date(dateString);
    task.startedAt = new Date(this.currentEditTask.startedAt);

    var total = this.currentEditTask.total;
    var totalString = String(total);
    var totalUnit = totalString.substr(totalString.length - 1, 1);
    console.log(totalUnit);
    if(isNaN(Number(totalUnit)))
    {
      var totalNumber = totalString.substr(0, totalString.length - 1);
      console.log(totalNumber);
      if(totalUnit == 'm')
      {
        total = Number(totalNumber) * 60;
      }else if(totalUnit == 'h')
      {
        total = Number(totalNumber) * 60 * 60;
      }
    } else {

    }

    task.total = total;

    // console.log(task);
    // return;


    this.currentEditTaskId = -1;
    this.currentEditTask = {
        name: '',
        startedAt: '',
        total: 0
    };
    // // var task = this.findTaskById(taskId);
    // // var startedAt = prompt("Input start time", task.startedAt);
    // // var total = prompt("Input total minute(s)", String(task.total / 60));

    // // task.startedAt = new Date(startedAt);
    // // task.total = Number(total) * 60;
    // // this.pushData(); 
    this.pushData();
  }
  
}
