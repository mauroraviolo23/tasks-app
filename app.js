require('colors');

const {
  inquirerMenu,
  pause,
  readInput,
  tasksListForDeletion,
  confirmDeletion,
  tasksListForCompletion,
} = require('./helpers/inquirer');
const { saveData, readDatabase } = require('./helpers/databaseInteractions');
const Tasks = require('./models/tasks');

const main = async () => {
  let option;
  const tasks = new Tasks();

  const tasksFromDB = readDatabase();

  if (tasksFromDB) {
    tasks.loadTasksFromArray(tasksFromDB);
  }

  do {
    option = await inquirerMenu();

    switch (option) {
      case '1':
        const description = await readInput('Insert a description: ');
        tasks.createTask(description);
        break;
      case '2':
        // console.log(tasks._list);
        tasks.completeList();
        break;
      case '3':
        tasks.listPendingOrCompleted();
        break;
      case '4':
        tasks.listPendingOrCompleted(false);
        break;
      case '5':
        const ids = await tasksListForCompletion(tasks.listAsArray);
        tasks.toggleTasksCompletion(ids);
        break;
      case '6':
        const id = await tasksListForDeletion(tasks.listAsArray);
        if (id !== '0') {
          const confirmation = await confirmDeletion(
            'Are you sure you want to delete this task?'
          );
          if (confirmation) tasks.deleteTask(id);
        }
        break;
    }

    saveData(tasks.listAsArray);

    await pause();
  } while (option !== '0');
};

main();
