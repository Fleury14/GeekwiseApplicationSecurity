const db = require('./db');
const xss = require('xss');

const TABLENAME = 'posts';

class PostDb {
    static getOne(id) {
        id = parseInt(id);
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND id = ${id}`;
        console.log(query);
        return db.oneOrNone(query);
    }

    static getAll() {
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false ORDER BY id DESC`;
        console.log(query);
        return db.any(query);
    }

    static updateOne(id, data) {
        id = parseInt(id);
        let params = [];
        Object.keys(data).forEach((key) => {
            params.push(`${key} = '${data[key]}'`);
        });
        let query = `UPDATE ${TABLENAME} SET ${params.join()} WHERE is_deleted=false AND id = ${id} RETURNING *`;
        console.log(query);
        return db.one(query);
    }

    static deleteOne(id) {
        id = parseInt(id);
        //let query = `DELETE FROM ${TABLENAME} WHERE id = ${id}`;
        let query = `UPDATE ${TABLENAME} SET is_deleted=true WHERE id = ${id}`;
        console.log(query);
        return db.result(query, [], r => r.rowCount);
    }

    static insertOne(data) {
        // let params = [];
        // let values = [];
        // Object.keys(data).forEach((key) => {
        //     params.push(key);
        //     values.push(`'${data[key]}'`);
        // });
        let authorScrubbed = xss(data['author'], {
            whiteList: [],
            stripIgnoreTag: true
        });
        let titleScrubbed = xss(data['title'], {
            whiteList: [],
            stripIgnoreTag: true
        });
        let postScrubbed = xss(data['post'], {
            whiteList: [],
            stripIgnoreTag: true
        });
        let query = `INSERT into ${TABLENAME} (author, title, post) VALUES($1, $2, $3) RETURNING *`;
        console.log(query, authorScrubbed, titleScrubbed, postScrubbed);
        return db.one(query, [authorScrubbed, titleScrubbed, postScrubbed]);
    }

    static getTotal() {
        let query = `SELECT count(*) FROM ${TABLENAME}`;
        console.log(query);
        return db.one(query, [], a => +a.count);
    }

    static search(param) {
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND (post ILIKE '%${param}%' OR author ILIKE '%${param}%')`;
        //let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND author = '${param}'`;
        console.log(query);
        return db.any(query);
    }

    static htmlParse(htmlData) {
        console.log('Parsing following HTML for sanitization:', htmlData);
        let result = xss(htmlData, {
            whiteList: [],
            // whiteList: {
            //     p: true,
            //     h4: true,
            //     div: ['class'],
            //     a: ['class', 'onclick', 'data-blogid', 'data-blogauthor', 'data-blogcontent']
            // },
            stripIgnoreTag: true
        });
        return result;
    }
}

module.exports = PostDb;