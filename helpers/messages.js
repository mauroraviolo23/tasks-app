require('colors');

const showMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log('================'.green);
    console.log('Choose an option');
    console.log('================\n'.green);

    console.log(`${'1.'.green} Create task`);
    console.log(`${'2.'.green} List tasks`);
    console.log(`${'3.'.green} List completed tasks`);
    console.log(`${'4.'.green} List pending tasks`);
    console.log(`${'5.'.green} Complete a task`);
    console.log(`${'6.'.green} Delete a task`);
    console.log(`${'0.'.green} Quit\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Choose an option: ', (option) => {
      readline.close();
      resolve(option);
    });
  });
};

const pause = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${'ENTER'.green} to continue\n`, (option) => {
      readline.close();
      resolve(option);
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
