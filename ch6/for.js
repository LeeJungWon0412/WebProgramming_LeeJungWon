//for(var i = 0; i < 5; i++)
//{
//    console.log('javascript');
//}

//for(var i = 0; i < 10; i++)
//{
//    console.log('*');
//}

//for(var i = 2; i < 101; i += 2)
//{
//    console.log(i);
//}

//var sum = 0;
//for(var i = 1; i < 11; i++)
//{
//    sum = sum + i;
//}
//console.log(sum);

//for(var i = 1; i < 10; i++)
//{
//    console.log("2 * " + i + " = " + 2 * i);
//}

//const readline = require('readline');
//const rl = readline.createInterface({
//    input : process.stdin,
//    output : process.stdout,
//});
//
//rl.question("단수를 입력하세요. : ", function(dan){
//    for(var i = 1; i < 10; i++)
//    {
//        console.log(dan + " * " + i + " = " + dan * i);
//    }
//    rl.close();
//});

//for(var i = 0; i < 101; i++)
//{
//    console.log('충전중 : ' + i + '%');
//}
//console.log('충전이 완료되었습니다.');

//var i = 0;
//for (; i < 101; )
//{
//    console.log('충전중 : ' + i + '%' + '<br/>');
//    i++;
//}
//console.log('충전이 완료되었습니다.');

//var arr = ["자바스크립트", "c언어", "파이썬"];

//console.log(arr[0]);
//console.log(arr[1]);
//console.log(arr[2]);

console.log('===== 초기 배열 데이터 =====');
var arr = ["자바스크립트", "C언어", "파이썬"];
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);

console.log();
console.log('===== 배열에 데이터 추가 =====');

arr.push('ASP.net');
arr.push('C#.net');

console.log();
console.log('===== 배열의 출력 =====');
console.log('배열의 길이 : ' + arr.length);
for(var i = 0; i < arr.length; i++)
{
    console.log(arr[i]);
}