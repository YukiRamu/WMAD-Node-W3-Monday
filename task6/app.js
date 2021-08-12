/* Task6 */
// Specification
// #1 All new files will be created under ./fileRepor1

const { error } = require("console");
const fs = require("fs");
const inquirer = require('inquirer');
const dirPath1 = "./fileRepo1/";
const dirPath2 = "./fileRepo2";

//parameter check for coding purpose
console.log(process.argv);

// ===============  function pieces =============== 
//check directory existance
const isDirectoryCreated = (dirName) => {
  if (fs.existsSync(`${dirName}`)) {
    return true;
  } else {
    return false;
  }
};

//check file existance in directory
const isFileCreated = (dirName, fileName) => {
  if (fs.existsSync(`${dirName}${fileName}`)) {
    return true;
  } else {
    return false;
  }
};

//check command parameter is specified
const isParameterProvided = (fileName) => {
  if (fileName === undefined) {
    return false;
  } else {
    return true;
  }
};

//concatenate data
const concatData = () => {
  let dataArray = [];
  for (let i = 4; i < process.argv.length; i++) {
    dataArray.push(process.argv[i]);
  }
  return dataArray.join(" ");
};

// ==================== Handle command line parameters ==================

switch (process.argv[2]) {
  case '--createFile':
    //create a file -- sync (execute one by one, wait for the previous line to complete)
    //check if the directory exists, if not show error message
    if (isDirectoryCreated(dirPath1)) {
      //check command line parameter is provided, if not show error message
      if (isParameterProvided(process.argv[3])) {
        //check if the same file name exists, if yes, show error message
        if (isFileCreated(dirPath1, process.argv[3])) {
          console.log(`${process.argv[3]} already exists. Please create a new file`);
        } else {
          fs.writeFile(`${dirPath1}${process.argv[3]}`, "", (error) => {
            if (error) {
              console.log(`${error}: A new file failed to be created`);
            } else {
              console.log("A new file has successfully been created!"); /////// SUCCESS MESSAGE !!!!
            }
          });
        }
      } else {
        console.log("Please provide a file name");
      }
    } else {
      console.log("Directory doesn't exit. Please create a directory first.");
    }
    break;

  case '--writeFile':
    //check if the file is under the fileRepo1
    if (isFileCreated(dirPath1, process.argv[3])) {
      //in case of no data input, show error message
      if (process.argv[4] === undefined) {
        console.log("Please provide the content to be written or the empty string to delete existing contents");
      } else {
        // take all command line parameters and create one string
        let data = concatData();
        fs.writeFile(`${dirPath1}${process.argv[3]}`, `${data}`, (error) => {
          if (error) {
            console.log(`${error}: ${process.argv[3]} failed to be updated`);
          } else {
            console.log(`${process.argv[3]} has been updated`);
          }
        });
      }
    } else {
      console.log("Please provide a file name");
    }
    break;

  case '--appendFile':
    //check if the file is under the fileRepo1
    if (isFileCreated(dirPath1, process.argv[3])) {
      //in case of no data input, show error message
      if (process.argv[4] === undefined) {
        console.log("Please provide the content to be appended");
      } else {
        // take all command line parameters and create one string
        let data = concatData();
        fs.appendFile(`${dirPath1}${process.argv[3]}`, `\n${data}`, (error) => {
          if (error) {
            console.log(`${error}: ${process.argv[3]} failed to be updated`);
          } else {
            console.log(`${process.argv[3]} has been updated`);
          }
        });
      }
    } else {
      console.log("Please provide a file name");
    }
    break;
  case '--renameFile':
    break;
  case '--deleteFile':
    //check if the file is under the fileRepo1
    if (isFileCreated(dirPath1, process.argv[3])) {
      //check if -y command is provided
      if (process.argv[4] === "-y") {
        fs.unlink(`${dirPath1}${process.argv[3]}`, (error) => {
          if (error) {
            console.log(`${error}: ${process.argv[3]} failed to be deleted`);
          } else {
            console.log(`${process.argv[3]} has been deleted`);
          }
        });
      } else {
        //prompt user
        inquirer
          .prompt([
            {
              type: "confirm",
              message: `Are you sure you want to delete ${process.argv[3]}?`,
              name: "answer"
            }
          ])
          .then((input) => {
            if (input.answer) {
              fs.unlink(`${dirPath1}${process.argv[3]}`, (error) => {
                if (error) {
                  console.log(`${error}: ${process.argv[3]} failed to be deleted`);
                } else {
                  console.log(`${process.argv[3]} has been deleted`);
                }
              });
            } else {
              console.log("Please confirm if it is ok to delete the file");
            }
          });
      }
    } else {
      console.log("Please provide a file name");
    }

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
    console.log("invalid command parameter.");
    break;
}
