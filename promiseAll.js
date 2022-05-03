function PromiseAll(promiseArray) {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promiseArray)) {
            return reject(new Error('传入参数必须为数组！'));
        }
        const res = [];
        const promiseNums = promiseArray.length;
        let counter = 0;
        for(let i = 0; i < promiseNums; i++) {
            Promise.resolve(promiseArray[i]).then(value => {
                counter++;
                res[i] = value;
                if(counter === promiseNums) {
                    resolve(res);
                }
            })
        }
    })
}