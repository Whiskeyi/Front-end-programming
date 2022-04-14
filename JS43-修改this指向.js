// apply
function bindThis(f, oTarget) {
    return function() {
        return f.apply(oTarget, arguments)
    }
}
// bind
function bindThis(f, oTarget) {
    return f.bind(oTarget)
}
// call
function bindThis(f, oTarget) {
    return function() {
        return f.call(oTarget, ...arguments)
    }
}