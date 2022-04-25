// throttle, 时间戳
function throttle(fn, delay) {
    let last = 0;
    return function() {
        let now = Date.now();
        if(now - last >= delay) {
            last = now;
            fn.apply(this, arguments);
        }
    }
}

// throttle, 定时器
function throttle(fn, delay) {
    let timer = null;
    return function() {
         let context = this;
         let args = arguments;
         if(!timer) {
             timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
             }, delay )
         }
    }
}

// throttle, 结合
function throttle(fn, delay) {
    let timer = null;
    let startTime =  Date.now();
    return function() {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        if(remaining <= 0) {
            fn.apply(context, args);
            startTime = Date.now();
        }else {
            timer = setTimeout(fn, remaining)
        }
    }
}

// debounce
function debounce(fn, delay) {
    let timer = null;
    return function() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
    }
}

function throttle(fn, delay) {
    let valid = false
    return function() {
      setTimeout(() => {
        fn()
        valid = true;
      }, delay)
    }
}