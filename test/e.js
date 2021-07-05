const { Vector2 } = require("three");

var q = new Vector2(1000, 1000);
var w = new Vector2(100, 100);

var e = q.angle(w);


console.log(q, w, e);
