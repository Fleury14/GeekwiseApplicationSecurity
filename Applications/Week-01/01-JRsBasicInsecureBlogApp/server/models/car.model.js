class Car {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return `Author: ${this.author}, Content: ${this.content}`;
    }
}

module.exports = Car;