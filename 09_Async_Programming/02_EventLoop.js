// const { resolve } = require('url');

/*
   ? Components of the Event Loop
       ! Call Stack:

        Executes functions in a "last in, first out" (LIFO) order.
        If it’s empty, the event loop picks up tasks from the callback queue.

        ! Web APIs/Node APIs:
        Handles asynchronous operations like setTimeout, fetch, or event listeners.
        
        ! Callback Queue:
        Stores the callbacks of completed asynchronous tasks.
        The event loop picks these callbacks for execution when the call stack is empty.
        
        ! Microtask Queue:
        Higher priority than the callback queue.
        Includes tasks like resolved Promises (.then() or async/await).
*/

const taskOne = () => {
  setTimeout(() => {
    console.log('task One');
  }, 2000);
};

const taskTwo = async () => {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (data.ok) {
      const msg = await data.json();
      console.log('task Two', msg);
    } else {
      throw new Error('something went wrong');
    }
  } catch (error) {
    console.log(error);
  }
};

const taskThree = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('task three');
  }, 3000);
}).then(msg => {
  console.log(msg);
});

const taskFour = () => {
  console.log('task four');
};

//! check the execution order

taskOne(); // ?second
taskTwo(); // ?third
taskThree; // ?fourth
taskFour(); // ?first


// Step-by-Step Execution

// ! Call Stack Execution:
// console.log("Start") runs and is logged.
// setTimeout is called and handed to the Web API with a 2-second timer.
// fetch is called, and the network request is sent to the Web API.
// console.log("End") runs and is logged.

// !Web API Processing:
// After 2 seconds, the setTimeout callback is added to the callback queue.
// When the fetch request completes, its callback is added to the microtask queue.

// !Event Loop:
// TODO,  Once the call stack is empty, the event loop first processes the  microtask queue (resolved fetch).
// Then, it processes the callback queue (setTimeout)