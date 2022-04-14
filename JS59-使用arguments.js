function useArguments() {
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}
function useArguments() {
    let arr = [...arguments];
    return arr.reduce((total, num) => total += num);
}