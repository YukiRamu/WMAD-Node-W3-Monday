/* This file is for configuring Router */
/* For future knowledge 
// the name of the router file should be equal to the parameter name
*/
const express = require("express");
const router = express.Router();
const os = require("os");
const checkDiskSpace = require('check-disk-space').default;

//prepare data
//#1: Computer Architecture
let arch;
switch (os.arch()) {
  case 'x32':
    arch = "32-bit extended system";
    break;

  case 'x64':
    arch = "64-bit extended system";
    break;

  case 'arm':
    arch = "32-bit  Advanced RISC Machine";
    break;

  case 'arm64':
    arch = "64-bit  Advanced RISC Machine";
    break;

  case 's390':
    arch = "31-bit The IBM System/390";
    break;

  case 's390x':
    arch = "64-bit The IBM System/390";
    break;

  case 'mipsel':
    arch = "64-bit Microprocessor without Interlocked Pipelined Stages";
    break;

  case 'mips':
    arch = "32-bit Microprocessor without Interlocked Pipelined Stages";
    break;

  case 'ia32':
    arch = "32-bit Intel Architecture";
    break;

  case 'ppc':
    arch = "PowerPC Architecture.";
    break;

  case 'ppc64':
    arch = "64-bit PowerPC Architecture.";
    break;

  default:
    console.log("Unknown");
}

//rendring index.ejs
router.get("/", (req, res) => {
  //rendering ejs and pass the data to bring into ejs
  res.render("index", {
    title: "API Route Practice",
    subtitle: "About Your PC"
  });
});

//rendering arch.ejs /api/arch
router.get("/arch", (req, res) => {
  //rendering ejs and pass the data to bring into ejs
  res.render("arch", {
    arch: arch
  });
});

router.get("/cpus", (req, res) => {
  //#2 CPUs
  const cpus = os.cpus();
  //rendering ejs and pass the data to bring into ejs
  res.render("cpus", {
    cpus: cpus
  });
});

router.get("/ram", (req, res) => {
  //#3 RAM (total and available) byte
  const totalRAM = os.totalmem();
  // Get the number of available memory in Byte
  const freeRAM = os.freemem();
  //rendering ejs and pass the data to bring into ejs
  res.render("ram", {
    totalRAM: totalRAM,
    freeRAM: freeRAM
  });
});

router.get("/diskspace", (req, res) => {
  //#4 Disk space (total and available)
  //rendering ejs and pass the data to bring into ejs
  checkDiskSpace("C:/").then((diskspace) => {
    console.log(diskspace);
    res.render("diskspace", { space: diskspace });
    return diskspace;
  });
});

router.get("/hostname", (req, res) => {
  //#5 Hostname
  const hostname = os.hostname();
  //rendering ejs and pass the data to bring into ejs
  res.render("hostname", {
    hostname: hostname
  });
});

//#6 IP Address
const networkInterface = os.networkInterfaces();

router.get("/ipaddress", (req, res) => {
  //rendering ejs and pass the data to bring into ejs
  res.render("ipaddress", {
    ipaddress: networkInterface["Wi-Fi"][3].address
  });
});


module.exports = router;