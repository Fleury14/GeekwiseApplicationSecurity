const User = require('../models/user.model');
const UserDb = require('../db/user.db');
const Common = require('./common');

class UserController {
    constructor(router) {
        router.route('/user/search')
            .post(this.search);
        router.route('/user/:id')
            .get(this.getOne)
            .put(this.updateOne)
            .delete(this.deleteOne);
        router.route('/user')
            .get(this.getAll)
            .post(this.insertOne);
        router.route('/user/login')
            .post(this.login);
        router.route('/user/usernamecheck/:username')
            .get(this.getOneByUserName);
    }

    async login(req, res, next) {
        try {
            let username = req.body.username;
            let password = req.body.password;
            const data = await UserDb.getLoginInfo(username, password);
            if (data) {
                let user = new User(data);
                return Common.resultOk(res, user);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async getOne(req, res, next) {
        try {
            const data = await UserDb.getOne(req.params.id);
            if (data) {
                let car = new User(data);
                return Common.resultOk(res, car);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async getOneByUserName(req, res, next) {
        try {
            const data = await UserDb.getOneByUserName(req.params.username);
            if (data) {
                let found = {notFound: false};
                return Common.resultOk(res, found);
            } else {
                let notFound = {notFound: true};
                return Common.resultOk(res, notFound);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async updateOne(req, res, next) {
        try {
            const data = await UserDb.updateOne(req.params.id, req.body);
            if (data) {
                let car = new User(data);
                return Common.resultOk(res, car);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async insertOne(req, res, next) {
        try {
            const data = await UserDb.insertOne(req.body);
            if (data) {
                let car = new User(data);
                return Common.resultOk(res, car);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async deleteOne(req, res, next) {
        try {
            const data = await UserDb.deleteOne(req.params.id);
            if (data) {
                return Common.resultOk(res, data);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async getAll(req, res, next) {
        try {
            const data = await UserDb.getAll();
            if (data) {
                let cars = data.map(car => { return new User(car) });
                return Common.resultOk(res, cars);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            return Common.resultErr(res, e);
        }
    }

    async search(req, res, next) {
        try {
            const data = await UserDb.search(req.body.search, req.body.order);
            if (data) {
                let posts = data.map(p => { return new User(p) });
                return Common.resultOk(res, posts);
            } else {
                return Common.resultOk([]);
            }
        } catch(e) {
            console.log('catch', e);
            return Common.resultErr(res, e.message);
        }
    }

    async htmlParse(req, res, next) {
        try {
            const data = await UserDb.htmlParse(req.body.htmlData);
            if (data) {
                // let posts = data.map(p => { return new User(p) });
                // console.log('Returning:', data);
                return Common.resultOk(res, data);
            } else {
                return Common.resultOk([]);
            }
        } catch(e) {
            console.log('catch', e);
            return Common.resultErr(res, e.message);
        }
    }
}

module.exports = UserController;