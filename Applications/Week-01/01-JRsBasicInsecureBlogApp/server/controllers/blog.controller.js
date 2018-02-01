const BlogPost = require('../models/blogpost.model');
const PostDb = require('../db/post.db');
const Common = require('./common');

class BlogController {
    constructor(router) {
        router.route('/car/search')
            .post(this.search);
        router.route('/car/:id')
            .get(this.getOne)
            .put(this.updateOne)
            .delete(this.deleteOne);
        router.route('/car')
            .get(this.getAll)
            .post(this.insertOne);
        router.route('/html')
            .post(this.htmlParse);
    }

    async getOne(req, res, next) {
        try {
            const data = await PostDb.getOne(req.params.id);
            if (data) {
                let car = new BlogPost(data);
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

    async updateOne(req, res, next) {
        try {
            const data = await PostDb.updateOne(req.params.id, req.body);
            if (data) {
                let car = new BlogPost(data);
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
            const data = await PostDb.insertOne(req.body);
            if (data) {
                let car = new BlogPost(data);
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
            const data = await PostDb.deleteOne(req.params.id);
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
            const data = await PostDb.getAll();
            if (data) {
                let cars = data.map(car => { return new BlogPost(car) });
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
            const data = await PostDb.search(req.body.search, req.body.order);
            if (data) {
                let posts = data.map(p => { return new BlogPost(p) });
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
            const data = await PostDb.htmlParse(req.body.htmlData);
            if (data) {
                // let posts = data.map(p => { return new BlogPost(p) });
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

module.exports = BlogController;