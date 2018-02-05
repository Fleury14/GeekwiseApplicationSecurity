class User {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return `Username: ${this.username}, Password: ${this.password}`;
    }
}

module.exports = User;