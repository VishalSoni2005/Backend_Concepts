// TODO : promises are used to handle async operations

const { resolve } = require('url');

// TODO : promises are objects that represent the eventual completion or failure of an asynchronous operation

// TODO : it have three state -> fulfilled, rejected, pending

////////////////////////////////////////////////////////////////////////////////////////
// ? Step 1 : create a promise object
const promiseOne = new Promise((resolve, reject) => {
  const sucess = true;
  if (sucess) {
    resolve('operation sucessed');
  } else {
    reject('failure');
  }
});
// console.log(promise);  // ! it represents an object

////////////////////////////////////////////////////////////////////////////////////////
// ? Step 2 : Handling promises Using then()
promiseOne
  .then(msg => {
    // console.log(msg);
  })
  .catch(err => {
    // console.log(err);
  })
  .finally(() => {
    // console.log("done");
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////
// ? Step 3 : Fetching an API using promises
const fetchData = fetch('https://jsonplaceholder.typicode.com/todos/1'); // ! fetch return a promise
fetchData
  .then(response => {
    if (response.ok) {
      return response.json(); // ! the response.ok property is always available when using the fetch method
    } else {
      throw new Error('something went wrong');
    }
  }) // this is object
  .then(data => {
    // uses the parsed JSON data to update the UI
    // console.log('Parsed JSON data :=> ', data);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    // console.log('done');
  });
// this respone.json() method returns a promise that resolves to the JSON data of the response

////////////////////////////////////////////////////////////////////////////////////////////////////////
// ? step 4: handle first promise
const slow = new Promise(resolve => {
  setTimeout(() => {
    resolve('slow');
  }, 2000);
});

const fast = new Promise(resolve => {
  setTimeout(() => {
    resolve('fast');
  }, 1000);
});

Promise.race([slow, fast]).then(msg => {
  // console.log(msg);
});

//////////////////////////////////////////////////////////////////////////
// ? step 5: using Async/Await
// ! ASYNC/AWAIT
// const promiseTwo = async () => {
//   try {
//     const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//     if (data.ok)
//       return data.json()
//     .then(msg => {
//         console.log(msg);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// promiseTwo();

const promiseTwo = async () => {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (data.ok) {
      const msg = await data.json(); // Use await to resolve the JSON promise
      console.log(msg); // Log the parsed JSON
    } else {
      throw new Error('Something went wrong'); // Handle non-OK responses
    }
  } catch (error) {
    console.log(error); // Log any errors
  }
};

promiseTwo();

//! Since you're already using async/await, there's no need to use .then() to handle the result of data.json()
//? FILE READING AND API HANDLING ARE TWO MAJOR TASKS WHICH REQUIRE PROMISES AND ASYNC/AWAIT