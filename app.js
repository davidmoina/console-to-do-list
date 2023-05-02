require("colors");
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksToDelete,
  confirm,
  showChecklist,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

console.clear();

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    //print menu in console
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Description: ");
        tasks.createTask(desc);
        break;

      case "2":
        tasks.listAllTasks();
        break;

      case "3":
        tasks.listAllTasks(true);
        break;

      case "4":
        tasks.listAllTasks(false);
        break;

      case "5":
        const ids = await showChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;

      case "6":
        const id = await listTasksToDelete(tasks.listArr);
        if (id !== "0") {
          const confirmDelete = await confirm("Are you sure?");
          if (confirmDelete) {
            tasks.deleteTask(id);
            console.log("Task deleted");
          }
        }

        break;

      default:
        break;
    }

    saveDB(tasks.listArr);

    await pause();
    console.clear();
  } while (opt !== "0");

  // pause();
};

main();
