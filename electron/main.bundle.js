webpackJsonp([2,4],{

/***/ 121:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 121;


/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(134);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.months = [];
        this.years = [];
        this.tasks = [];
        this.suggestTasks = [];
        this.calendarDate = new Date();
        this.calendarMonth = 1;
        this.calendarYear = 2017;
        this.currentTaskId = -1;
        this.currentEditTaskId = -1;
        this.currentEditTask = {
            name: '',
            startedAt: '',
            total: 0
        };
        this.updateTaskTimeInterval = null;
        this.months = [
            { id: 1, name: 'Jan' },
            { id: 2, name: 'Feb' },
            { id: 3, name: 'Mar' },
            { id: 4, name: 'Apr' },
            { id: 5, name: 'May' },
            { id: 6, name: 'Jun' },
            { id: 7, name: 'Jul' },
            { id: 8, name: 'Aug' },
            { id: 9, name: 'Sep' },
            { id: 10, name: 'Oct' },
            { id: 11, name: 'Nov' },
            { id: 12, name: 'Dec' },
        ];
        for (var i = (new Date()).getFullYear() - 5; i < (new Date()).getFullYear() + 5; i++) {
            this.years.push(i);
        }
        this.calendarMonth = this.calendarDate.getMonth() + 1;
        this.calendarYear = this.calendarDate.getFullYear();
        this.highlightCurrentDate = function (day) {
            if (day.date.getDate() == _this.calendarDate.getDate()
                && day.date.getMonth() == _this.calendarDate.getMonth()
                && day.date.getFullYear() == _this.calendarDate.getFullYear()) {
                day.cssClass = 'highlight-cell';
            }
        };
        this.pullData();
        this.suggestTasks = this.tasks;
        clearInterval(this.updateTaskTimeInterval);
        this.updateTaskTimeInterval = setInterval(function () {
            _this.updateTaskTimeInterval_Tick();
        }, 1000);
    }
    AppComponent.prototype.clickMe = function (x) {
        console.log(x);
        var date = new Date();
        date.setMonth(5);
        this.calendarDate = date;
    };
    AppComponent.prototype.monthSelect_Change = function () {
        var date = new Date();
        date.setMonth(this.calendarMonth - 1);
        this.calendarDate = date;
    };
    AppComponent.prototype.yearSelect_Change = function () {
        var date = new Date();
        date.setFullYear(this.calendarYear);
        this.calendarDate = date;
    };
    AppComponent.prototype.addTaskInput_Keypress = function (event) {
        if (event.keyCode == 13) {
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
        }
        else {
            this.suggestTasks = this.tasks.filter(function (item) {
                return item.name.indexOf(event.target.value) > -1;
            });
        }
    };
    AppComponent.prototype.editTaskNameInput_Keypress = function (event) {
        if (event.keyCode == 13) {
            this.saveTaskButton_Click();
        }
        else {
            this.currentEditTask.name = event.target.value;
        }
    };
    AppComponent.prototype.editTaskStartedAtInput_Keypress = function (event) {
        if (event.keyCode == 13) {
            this.saveTaskButton_Click();
        }
        else {
            this.currentEditTask.startedAt = event.target.value;
        }
    };
    AppComponent.prototype.editTaskTotalInput_Keypress = function (event) {
        if (event.keyCode == 13) {
            this.saveTaskButton_Click();
        }
        else {
            this.currentEditTask.total = event.target.value;
        }
    };
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
    AppComponent.prototype.findTaskById = function (taskId) {
        for (var i in this.tasks) {
            if (this.tasks[i].id == taskId) {
                return this.tasks[i];
            }
        }
        return null;
    };
    AppComponent.prototype.updateTaskTimeInterval_Tick = function () {
        if (this.currentTaskId > 0) {
            var task = this.findTaskById(this.currentTaskId);
            if (!task)
                return;
            var finishedAt = new Date();
            task.total++;
            this.pushData();
        }
    };
    AppComponent.prototype.pushData = function () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    };
    AppComponent.prototype.pullData = function () {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
        if (!this.tasks) {
            this.tasks = [];
            this.pushData();
        }
        for (var i in this.tasks) {
            this.tasks[i].startedAt = new Date(this.tasks[i].startedAt);
        }
    };
    AppComponent.prototype.startTrackTaskButton_Click = function (taskId) {
        this.currentTaskId = taskId;
        this.currentEditTaskId = -1;
    };
    AppComponent.prototype.stopTrackTaskButton_Click = function (taskId) {
        this.currentTaskId = -1;
        this.currentEditTaskId = -1;
    };
    AppComponent.prototype.deleteTaskButton_Click = function (taskId) {
        this.currentTaskId = -1;
        this.currentEditTaskId = -1;
        this.tasks = this.tasks.filter(function (item) {
            return item.id !== taskId;
        });
        this.pushData();
    };
    AppComponent.prototype.editTaskButton_Click = function (taskId) {
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
    };
    AppComponent.prototype.saveTaskButton_Click = function () {
        var task = this.findTaskById(this.currentEditTaskId);
        task.name = this.currentEditTask.name;
        var timezone = -this.calendarDate.getTimezoneOffset() / 60;
        var timezoneString = String(timezone);
        if (timezone > 0) {
            timezoneString = '+' + timezone;
        }
        else {
        }
        // var dateString = this.calendarDate.getFullYear() + '-' + (this.calendarDate.getMonth() + 1) + '-' + this.calendarDate.getDate() + ' ' + this.currentEditTask.startedAt + ' ' + timezone;
        // console.log(dateString);
        // task.startedAt = new Date(dateString);
        task.startedAt = new Date(this.currentEditTask.startedAt);
        var total = this.currentEditTask.total;
        var totalString = String(total);
        var totalUnit = totalString.substr(totalString.length - 1, 1);
        console.log(totalUnit);
        if (isNaN(Number(totalUnit))) {
            var totalNumber = totalString.substr(0, totalString.length - 1);
            console.log(totalNumber);
            if (totalUnit == 'm') {
                total = Number(totalNumber) * 60;
            }
            else if (totalUnit == 'h') {
                total = Number(totalNumber) * 60 * 60;
            }
        }
        else {
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
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(250),
        styles: [__webpack_require__(247)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular_calendar__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__secondsToTime_pipe__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sameStartedAt_pipe__ = __webpack_require__(132);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import 'hammerjs';





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__sameStartedAt_pipe__["a" /* SameStartedAtPipe */],
            __WEBPACK_IMPORTED_MODULE_8__secondsToTime_pipe__["a" /* SecondsToTimePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6_angular_calendar__["a" /* CalendarModule */].forRoot()
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SameStartedAtPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SameStartedAtPipe = (function () {
    function SameStartedAtPipe() {
    }
    SameStartedAtPipe.prototype.transform = function (items, date) {
        if (!items || !date) {
            return items;
        }
        return items.filter(function (item) {
            return item.startedAt.getDate() == date.getDate()
                && item.startedAt.getMonth() == date.getMonth()
                && item.startedAt.getFullYear() == date.getFullYear();
        });
    };
    return SameStartedAtPipe;
}());
SameStartedAtPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Pipe */])({
        name: 'sameStartedAt',
        pure: false
    })
], SameStartedAtPipe);

//# sourceMappingURL=sameStartedAt.pipe.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecondsToTimePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SecondsToTimePipe = (function () {
    function SecondsToTimePipe() {
        this.times = {
            year: 31557600,
            month: 2629746,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };
    }
    SecondsToTimePipe.prototype.transform = function (seconds) {
        var time_string = '';
        var plural = '';
        for (var key in this.times) {
            if (Math.floor(seconds / this.times[key]) > 0) {
                if (Math.floor(seconds / this.times[key]) > 1) {
                    plural = 's';
                }
                else {
                    plural = '';
                }
                time_string += Math.floor(seconds / this.times[key]).toString() + ' ' + key.toString() + plural + ' ';
                seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);
            }
        }
        return time_string;
    };
    return SecondsToTimePipe;
}());
SecondsToTimePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Pipe */])({
        name: 'secondsToTime'
    })
], SecondsToTimePipe);

//# sourceMappingURL=secondsToTime.pipe.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

module.exports = "<md-input-container class=\"full-width\">\n  <input mdInput placeholder=\"Add Task..\" [mdAutocomplete]=\"auto\" (keyup)=\"addTaskInput_Keypress($event)\">\n</md-input-container>\n\n<md-autocomplete #auto=\"mdAutocomplete\">\n  <md-option *ngFor=\"let task of suggestTasks\" [value]=\"task.name\">\n    {{ task.name }}\n  </md-option>\n</md-autocomplete>\n\n<md-list>\n  <md-list-item *ngFor=\"let task of tasks | sameStartedAt: calendarDate\">\n    <md-icon md-list-icon *ngIf=\"task.id != currentTaskId\">list</md-icon>\n    <md-icon md-list-icon *ngIf=\"task.id == currentTaskId\">pets</md-icon>\n    <h4 md-line *ngIf=\"task.id != currentEditTaskId\">{{ task.name }}</h4>\n    <h4 md-line *ngIf=\"task.id == currentEditTaskId\"><input mdInput placeholder=\"Task's name\" value=\"{{ currentEditTask.name }}\"  (keyup)=\"editTaskNameInput_Keypress($event)\"></h4>\n    <p md-line *ngIf=\"task.id != currentEditTaskId\"> {{ task.startedAt | date: 'shortTime' }} </p>\n    <p md-line *ngIf=\"task.id == currentEditTaskId\"><input mdInput placeholder=\"Task started at\" value=\"{{ currentEditTask.startedAt }}\"  (keyup)=\"editTaskStartedAtInput_Keypress($event)\"></p>\n    <p md-line *ngIf=\"task.id != currentEditTaskId\"> {{ task.total | secondsToTime }} </p>\n    <p md-line *ngIf=\"task.id == currentEditTaskId\"><input mdInput placeholder=\"Task's total minutes\" value=\"{{ currentEditTask.total }}\"  (keyup)=\"editTaskTotalInput_Keypress($event)\"></p>\n    <button md-raised-button *ngIf=\"task.id != currentTaskId\" (click)=\"startTrackTaskButton_Click(task.id)\">Start</button>\n    <button md-raised-button *ngIf=\"task.id == currentTaskId\" (click)=\"stopTrackTaskButton_Click(task.id)\">Stop</button>\n    <button md-raised-button *ngIf=\"task.id != currentEditTaskId\" (click)=\"editTaskButton_Click(task.id)\">Edit</button>\n    <button md-raised-button *ngIf=\"task.id == currentEditTaskId\" (click)=\"saveTaskButton_Click()\">Save</button>\n    <button md-raised-button (click)=\"deleteTaskButton_Click(task.id)\">Delete</button>\n  </md-list-item>\n</md-list>\n\n<!--<md-toolbar>\n  <md-select [(ngModel)]=\"calendarMonth\" (change)=\"monthSelect_Change()\">\n    <md-option *ngFor=\"let month of months\" [value]=\"month.id\">\n      {{ month.name }}\n    </md-option>\n  </md-select>\n  <md-select [(ngModel)]=\"calendarYear\" (change)=\"yearSelect_Change()\">\n    <md-option *ngFor=\"let year of years\" [value]=\"year\">\n      {{ year }}\n    </md-option>\n  </md-select>\n</md-toolbar>-->\n\n<mwl-calendar-month-view #calendar [viewDate]=\"calendarDate\" (dayClicked)=\"calendarDate = $event.day.date\" [dayModifier]=\"highlightCurrentDate\">\n</mwl-calendar-month-view>\n\n<br/>\n\n\n"

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(122);


/***/ })

},[310]);
//# sourceMappingURL=main.bundle.js.map