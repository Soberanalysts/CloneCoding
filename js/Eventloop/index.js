import fs from 'fs'
// const fs = require('fs');

console.log('Start');

process.nextTick(()=> console.log('nextTick'));

Promise.resolve()
    .then(() => console.log('Promise'));

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

fs.readFile(import.meta.url, () => {
    console.log('fs.readFile');
});

console.log('End');

