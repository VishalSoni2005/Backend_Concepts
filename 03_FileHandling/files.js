const { log } = require("console");
const fs = require("fs");

// making sync FileSystem
        // PATH , CONTENT 
// fs.writeFileSync("./NodeJs/03_FileHandling/textOne.txt", "Making Sync files");

// async file making
//     PATH, CONTEXT, CALL BACK
// fs.writeFile('./NodeJs/03_FileHandling/textTwo.txt', "Making Async File", (err) => {
//     console.log("Error occured");
// })

const readIt = fs.readFileSync('./NodeJs/03_FileHandling/text.txt', 'utf-8')
// console.log(readIt);

let makeFolder = fs.mkdirSync("./In_030");


// console.log(makeFolder);




