function makeCar(name) {
    console.log(`${name} is placed for manufacturing .....`);
    return true;
}


function destroyCar(name) {
    console.log(`Your car ${name} is under Destruction .....`);
    return true;
}

module.exports = {
    construction: makeCar,
    destruction: destroyCar
};


// exports.add = (a, b) => a + b;