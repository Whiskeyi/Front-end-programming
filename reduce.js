Array.prototype._reduce = function (f) {
    res = 0;
    this.forEach((item, index) => {
        res += item;
    })
    return res;
}