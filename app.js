require("colors");
const { inquirerMenu } = require("./helpers/inquirer");

console.clear();

const main = async() => {
    console.log("Hello");

    let opt = "";

    do {
        opt = await inquirerMenu();
        console.log({opt});

        // if(opt !== "0") await pause();

    } while (opt !== "0");
    
    // pause();
}

main()