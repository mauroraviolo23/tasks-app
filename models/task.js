const { v4: uuid } = require('uuid');

class Task {
  id = '';
  description = '';
  completedAt = null;

  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.completedAt = null;
  }
}

module.exports = Task;
