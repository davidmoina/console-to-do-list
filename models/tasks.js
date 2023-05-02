const Task = require("./task");
require("colors");

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  createTask(desc = "") {
    const task = new Task(desc);

    this._list[task.id] = task;
  }

  loadTasksFromArray(tasks = []) {
    tasks.map((task) => {
      this._list[task.id] = task;
    });
  }

  listAllTasks(completed = null) {
    let tasksToShow = this.listArr;

    if (completed) {
      tasksToShow = this.listArr.filter((task) => {
        return task.completedOn !== null;
      });
    }

    if (completed === false) {
      tasksToShow = this.listArr.filter((task) => {
        return task.completedOn === null;
      });
    }

    tasksToShow.map((task, index) => {
      const idx = `${index + 1}.`.green;
      const { desc, completedOn } = task;
      const status = completedOn ? "Completed".green : "Pending".red;

      console.log(`${idx} ${desc} :: ${status}`);
    });
  }

  toggleCompleted(ids) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedOn) {
        task.completedOn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedOn = null;
      }
    });
  }
}

module.exports = Tasks;
