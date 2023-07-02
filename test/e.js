const { Vector2 } = require("three");

let q = new Vector2(1000, 1000);
let w = new Vector2(100, 100);

let e = q.angle(w);


console.log(q, w, e);
