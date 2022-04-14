let arr = [1,[2,[3,[4]]]];

// map
console.log(arr.toString().split(',').map(item => parseInt(item)));

// forEach
let rz = [];
arr.toString().split(',').forEach((item) => rz.push(parseInt(item)));
console.log(rz);

// reduce
const myFlat = (arr) => {
    return arr.reduce((pre,cur) => {
      return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur);
    },[])
}
console.log(myFlat(arr));