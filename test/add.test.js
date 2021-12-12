// console.log("hello world");
//const add = require('../index');
var expect=require("chai").expect;
describe('測試add函數', ()=> {
  it('測試5+5預期10', ()=> {
    expect(5+5).to.be.equal(10);
  });
});

function add(a, b) {
 return a + b;
}