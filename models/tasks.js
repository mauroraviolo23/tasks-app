const Task = require('./task');

class Tasks {
  _list = {};

  get listAsArray() {
    const list = [];

    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    delete this._list[id];
    console.log('Task has been deleted'.gray);
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(description = '') {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  completeList() {
    this.listAsArray.forEach((task, i) => {
      const taskNumber = `${i + 1}.`.gray;
      const taskDescription = `${task.description}`.white;
      const taskStatus = `${':'.grey} ${
        task.completedAt === null ? 'Pending'.red : 'Completed'.green
      }`;
      console.log(`${taskNumber} ${taskDescription} ${taskStatus}`);
    });
  }

  listPendingOrCompleted(completed = true) {
    const filteredByCompletion = this.listAsArray.filter(
      (task) => new Boolean(task.completedAt).valueOf() === completed
    );
    filteredByCompletion.forEach((task, i) => {
      const taskNumber = `${i + 1}.`.gray;
      const taskDescription = `${task.description}`.white;
      const taskCompletionDate = `${task.completedAt}`.green;
      const taskStatus = `${':'.grey} ${
        task.completedAt === null ? 'Pending'.red : taskCompletionDate
      }`;
      console.log(`${taskNumber} ${taskDescription} ${taskStatus}`);
    });
  }

  toggleTasksCompletion(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) task.completedAt = new Date().toLocaleDateString();
    });

    this.listAsArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
