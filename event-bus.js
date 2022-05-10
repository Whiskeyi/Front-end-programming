/* const event = new Event();
event.on('test', () => console.log(1111));
console.log(222);
event.emit('test');
console.log(333); */

class EventEmitter {
    constructor() {
        this.events = {};
     /*    {
            'add': [cb1, cb2],
            'off': [cb1, cb2]
        } */
    }

    on(event, cb) {
        if(!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
        // 链式调用
        return this;
    }

    emit(event, ...args) {
        const cbs = this.events[event];
        if(!cbs) {
            console.log(`${event} event is not registered`);
            return this;
        }
        cbs.forEach(cb => cb.apply(this, args));
        return this;
    }
    off(event, cb) {
        if(!cb) {
            this.events[event] = null;
        } else {
            this.events[event] = this.events[event].filter(item => item !== cb);
        }
        return this;
    }

    once(event, cb) {
        // isTrue(修改原有数据结构，易出问题)
        const func = (...args) => {
            this.off(event, func);
            cb.apply(this, args);
        }
        this.on(event, func);
        return this;
    }
}