/* Task6 */
const { error } = require("console");
const fs = require("fs");
const dirPath1 = "./fileRepo1/";
const dirPath2 = "./fileRepo2";

//parameter check
console.log(process.argv);

console.log(`${dirPath1}newFile.txt`);

switch (process.argv[2]) {
  case '--createFile':
    //create a file -- sync (execute one by one, wait for the previous line to complete)
    fs.writeFile(`${dirPath1}newFile.txt`, "", (error) => {
      if (error) {
        console.log("A new file failed to be created");
      } else {
        console.log("A new file has successfully been created!");
      }
    });
    break;

  case '--writeFile':
    //in case of no data input
    if (process.argv[4] === undefined) {
      process.argv[4] = "";
    }
    fs.writeFile(`${dirPath1}${process.argv[3]}`, `${process.argv[4]}`, (error) => {
      if (error) {
        console.log(`${process.argv[3]} failed to be updated`);
      } else {
        console.log(`${process.argv[3]} has been updated`);
      }
    });
    break;
  case '--appendFile':
    //in case of no data input
    if (process.argv[4] === undefined) {
      process.argv[4] = "";
    }
    fs.appendFile(`${dirPath1}${process.argv[3]}`, `\n${process.argv[4]}`, (error) => {
      if (error) {
        console.log(`${process.argv[3]} failed to be updated`);
      } else {
        console.log(`${process.argv[3]} has been updated`);
      }
    });
    break;
  case '--renameFile':
    break;
  case '--deleteFile':
    fs.unlink(`${dirPath1}${process.argv[3]}`,);
    break;
  case '--listFiles':
    break;
  case '--copyFile':
    break;
  case '--movefile':
    break;
  case '--size':
    break;
  case '--view':
    break;
  default:
    break;
}



(error) => {
  if (error) {
    console.log("A new file failed to be created :(");
    throw error;
  } else {
    console.log("A new file is successfully created!");
  }
};
