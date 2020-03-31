//变量缓存器，方便在不同的类中访问和修改变量
export class DataStore {
    static getInstance() {
        if (!DataStore.instace) {
            DataStore.instace = new DataStore();
        }
        return DataStore.instace;
    }

    constructor() {
        this.map = new Map();
    }

    put(key, val) {
        if (typeof val === 'function') {
            val = new val();
        }
        this.map.set(key, val);
        return this;
    }

    get(key) {
        return this.map.get(key);
    }

    destroy() {
        for (let val of this.map.values()) {
            val = null;
        }
        this.map.clear();
    }

}
