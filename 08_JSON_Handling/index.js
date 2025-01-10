const data = require('./send');

const { sendData } = data;

sendData.then( (data) => {
    console.log(data);
})