// 方法一，通过indexOf
/* const arr = [1, 1, 2, 2, 2, 3, 3];
let s = [];
for(var i = 0; i < arr.length; i++){
    if(s.indexOf(arr[i]) == -1) {
        s.push(arr[i]);
    }
}
console.log(s); */

// 方法二，通过map
const arr = [1, 1, 2, 2, 2, 3, 3];
const map = new Map();
for(num of arr) {
    map.set(num, map.get(num) + 1 || 1);
}
console.log([...map.keys()]);

// 方法三，通过splice删除，两层循环
/* const arr = [1, 1, 2, 2, 2, 3, 3];
for(var i = 0; i < arr.length; i++){
    for(var j = i + 1; j < arr.length; j++){
        if(arr[i] == arr[j]){
            arr.splice(j, 1);
            j--;
        }
    }
}
console.log(arr); */

// 方法四，includes
/* const arr = [1, 1, 2, 2, 2, 3, 3];
let s = [];
for(var i = 0; i < arr.length; i++){
    if(!s.includes(arr[i])) {
        s.push(arr[i]);
    }
}
console.log(s); */

// 方法五，es6新增set去重
function deRepeat() {
    return [...new Set(arr)]
  }