/* Task6 */
// Specification
// #1 All new files will be created under ./fileRepor1
// Can be refactored by creating more function pieces and reduce duplicate codes,
// but it is ok now.

const { error } = require("console");
const fs = require("fs");
const inquirer = require('inquirer');
const dirPath1 = "./fileRepo1/";
const dirPath2 = "./fileRepo2/";

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
const isParameterProvided = (param) => {
  if (param === undefined) {
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

// ==================== Handle command line parameters ==================//
//Can be refactored by creating more function pieces and reduce duplicate codes,
//but it is ok now.

switch (process.argv[2]) {
  case '--createFile':
    //create a file -- sync (execute one by one, wait for the previous line to complete)
    //check if the directory exists, if not show error message
    if (isDirectoryCreated(dirPath1) === true) {
      //check command line parameter is provided, if not show error message
      if (isParameterProvided(process.argv[3])) {
        //check if the same file name exists, if yes, show error message
        if (isFileCreated(dirPath1, process.argv[3]) === true) {
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
    //check if the file name is specified
    if (isParameterProvided(process.argv[3]) === true) {
      //check if the file is under the fileRepo1
      if (isFileCreated(dirPath1, process.argv[3]) === true) {
        //in case of no data input, show error message
        if (!isParameterProvided(process.argv[4])) {
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
        console.log(`${process.argv[3]} doesn't exist`);
      }
    } else {
      console.log("Please provide a file name");
    }
    break;

  case '--appendFile':
    //check if the file name is specified
    if (isParameterProvided(process.argv[3]) === true) {
      //check if the file is under the fileRepo1
      if (isFileCreated(dirPath1, process.argv[3]) === true) {
        //in case of no data input, show error message
        if (!isParameterProvided(process.argv[4])) {
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
        console.log(`${process.argv[3]} doesn't exist`);
      }
    } else {
      console.log("Please provide a file name");
    }
    break;
  case '--renameFile':
    //check if the file name is specified
    if (isParameterProvided(process.argv[3]) === true) {
      //check if the file is under the fileRepo1
      if (isFileCreated(dirPath1, process.argv[3]) === true) {
        //in case of no data input, show error message
        if (!isParameterProvided(process.argv[4])) {
          console.log("Please provide a new file name");
        } else {
          fs.renameSync(`${dirPath1}${process.argv[3]}`, `${dirPath1}${process.argv[4]}`);
          console.log(`A file name has successfully changed to ${process.argv[4]}`);
        }
      } else {
        console.log(`${process.argv[3]} doesn't exist`);
      }
    } else {
      console.log("Please provide a file name");
    }
    break;
  case '--deleteFile':
    //check if the file name is specified
    if (isParameterProvided(process.argv[3]) === true) {
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
        console.log(`${process.argv[3]} doesn't exist`);
      }
    } else {
      console.log("Please provide a file name");
    }
    break;
  case '--listFiles':
    //check if the directory name is specified
    if (isParameterProvided(process.argv[3]) === true) {
      //check if the directory exists
      if (isDirectoryCreated(process.argv[3]) === true) {
        console.log(`The list of files in ${process.argv[3]} is :`);
        for (let i = 0; i < fs.readdirSync(dirPath1).length; i++) {
          console.log(fs.readdirSync(dirPath1)[i]);
        }
      } else {
        console.log(`directory, ${process.argv[3]} doesn't exist`);
      }
    } else {
      console.log("Please specify a directory name");
    }
    break;
  case '--copyFile':
    //check if the file names are specified
    if (isParameterProvided(process.argv[3]) === true && isParameterProvided(process.argv[4]) === true) {
      //check if the current file is under fileRepo1 and the destination file is not yet created
      if (isFileCreated(dirPath1, process.argv[3]) === true && isFileCreated(dirPath1, process.argv[4]) === false) {
        fs.copyFileSync(`${dirPath1}${process.argv[3]}`, `${dirPath1}${process.argv[4]}`);
        console.log("File copy suceeded");
      } else {
        console.log(`Please make sure only ${process.argv[3]} exists in the directory`);
      }
    } else {
      console.log("Please provide two file names, current and destination");
    }
    break;
  case '--moveFile':
    //move file from fileRepo1 to fileRepo2
    //check if the file names are specified
    if (isParameterProvided(process.argv[3]) === true && isParameterProvided(process.argv[4]) === true) {
      //check if the current file is under fileRepo1 and the destination file is not yet under fileRepo2
      if (isFileCreated(dirPath1, process.argv[3]) === true && isFileCreated(dirPath2, process.argv[4]) === false) {
        fs.renameSync(`${dirPath1}${process.argv[3]}`, `${dirPath2}${process.argv[4]}`);
        console.log(`${process.argv[3]} has successfully moved to the fileRepo2 with the file name ${process.argv[4]}`);
      } else {
        console.log(`Please make sure ${process.argv[3]} exists in the fileRepo1 and ${process.argv[4]} doesn't exist in the fileRepo2`);
      }
    } else {
      console.log("Please provide two file names, current and destination");
    }
    break;
  case '--size':
    //check if the file name is specified
    if (isParameterProvided(process.argv[3]) === true) {
      //check if the file is under the fileRepo1
      if (isFileCreated(dirPath1, process.argv[3]) === true) {
        let stat = fs.statSync(`${dirPath1}${process.argv[3]}`);
        console.log(`The size of ${process.argv[3]} is ${stat.size} bytes`);
      } else {
        console.log(`${process.argv[3]} doesn't exist`);
      }
    } else {
      console.log("Please provide a file name");
    }
    break;
  case '--view':
    //check if the file name is specified
    if (isParameterProvided(process.argv[3]) === true) {
      //check if the file is under the fileRepo1
      if (isFileCreated(dirPath1, process.argv[3]) === true) {
        //check if --pause parameter is applied
        if (process.argv[4] === "--pause") {
          //check if the line number is specified
          if (isParameterProvided(process.argv[5]) === true && Number(process.argv[5]) !== NaN) {

            let text = fs.readFileSync(`${dirPath1}${process.argv[3]}`, "utf-8");
            let lines = text.toString().split('\n');

            console.log(lines);

            for (let i = 0; i < Number(process.argv[5]); i++) {
              console.log(lines[i]);
            }

          } else {
            console.log("Please specify the line number you would like to pause");
          }
        } else {
          //show all contents at once
          console.log(`The contents of ${process.argv[3]} is :`);
          console.log(fs.readFileSync(`${dirPath1}${process.argv[3]}`, "utf-8"));
        }
      } else {
        console.log(`${process.argv[3]} doesn't exist`);
      }
    } else {
      console.log("Please provide a file name");
    }
    break;
  default:
    console.log("invalid command parameter.");
    break;
}
