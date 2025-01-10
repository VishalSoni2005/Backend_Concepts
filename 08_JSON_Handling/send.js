
const sendData = fetch('https://jsonplaceholder.typicode.com/posts').then( (res) => res.json());
// NOTE : fetch function
// fetch returns a Promise that resolves to the Response object.

module.exports = {
    sendData : sendData
}



// sendData.then( (data) => {
//     console.log(data);
// })