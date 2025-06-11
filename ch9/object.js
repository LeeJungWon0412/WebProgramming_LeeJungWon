let dic = {
    present : "현재",
};

console.log(dic.present);
dic.present = "선물";
console.log(dic.present);

const dic = {
    present : "현재",
};

console.log(dic.present);
dic.present = "선물";
console.log(dic.present);

let user = {
    id : "jamsu",
    pw : "1111",
    name : "lch",
    mobile : "010-4477-XXXX",
    country : "대한민국"
}

for(let info in user){
    console.log(`${info} : ${user[info]}`);
}