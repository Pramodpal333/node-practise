const {Buffer} = require("buffer");

// const buf = Buffer.alloc(4);
// console.log(buf); // <Buffer 00 00 00 00>

// const buf = Buffer.from("Hey! there");
// console.log(buf); // prints <Buffer 48 65 79 21 20 74 68 65 72 65>
// console.log(buf.toString()); // prints Hey! there


// const buf = Buffer.alloc(10);
// buf.write('Hello!');
// console.log(buf.toString());


// const buf = Buffer.from("Hello world!");
// console.log(buf);
// console.log(buf.toString());
// console.log(buf.toString('utf-8',0,4));
// console.log(buf.toString('base64'));


//Mofifing bufffer
// const buf = Buffer.from("Hello");
// console.log(buf);
// buf[0] = 0x49;
// console.log(buf.toString());

// merging buffer
const buf1 = Buffer.from("Hello");
const buf2 = Buffer.from(" World!");
const merged = Buffer.concat([buf1,buf2]);
console.log(merged.toString());
console.log(merged.length);