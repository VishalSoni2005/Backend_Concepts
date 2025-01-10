const data = require('./send');

const { sendData } = data;

sendData.then( (data) => {
    console.log(data[0]);

})

console.log(sendData , "Hello");

console.log("Third comit");

// console.log(sendData);
