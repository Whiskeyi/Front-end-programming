Function.prototype._bind = function(context,fn){
    let _this = this;
    return function(...args){
      return _this.apply(context, args)
    }
  }