Array.prototype._map = function (fn){
    if(typeof fn !== 'function') return;
    let newArr = [];
    for(let i = 0;i<this.length ;i++){
      newArr[i] = fn(this[i])
    }
return newArr;
}