let user = {
    id : 'jamsuham',
    pw : '1111',
    name : '잠수함',
    age : 30,
};

let {id, ...rest} = user;

console.log(id);
console.log(rest.pw);
console.log(rest.name);
console.log(rest.age);