/**
* @authors 汤圆
* @date    2017-08-17 09:11:32
* @version $Id$
*/

function test(){
    var a = 1;
    var b = 2;
    return a+b;
}

test.prototype.name = 'zky';
var boy = new test();
var girl = new test();
console.log(boy.name);
console.log(girl.name);
