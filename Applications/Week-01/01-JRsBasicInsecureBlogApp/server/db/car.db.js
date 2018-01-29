const db = require('./db');
const xss = require('xss');

const TABLENAME = 'cars';

class CarDb {
    static getOne(id) {
        id = parseInt(id);
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND id = $1`;
        console.log(query, id);
        return db.oneOrNone(query, [id]);
    }

    static getAll() {
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false ORDER BY id DESC`;
        console.log(query);
        return db.any(query);
    }

    static updateOne(id, data) {
        id = parseInt(id);
        let params = [];
        // Object.keys(data).forEach((key) => {
        //     params.push(`${key} = '${data[key]}'`);
        // });
        let query = `UPDATE ${TABLENAME} SET author = $1, content = $2 WHERE is_deleted=false AND id = $3 RETURNING *`;
        console.log(query, data['author'], data['content'], id);
        return db.one(query, [data['author'], data['content'], id]);
    }

    static deleteOne(id) {
        id = parseInt(id);
        //let query = `DELETE FROM ${TABLENAME} WHERE id = ${id}`;
        let query = `UPDATE ${TABLENAME} SET is_deleted=true WHERE id = $1`
        console.log(query, id);
        return db.result(query, [id], r => r.rowCount);
    }

    static insertOne(data) {
        // let params = [];
        // let values = [];
        // Object.keys(data).forEach((key) => {
        //     params.push(key);
        //     values.push(`'${data[key]}'`);
        // });
        let query = `INSERT into ${TABLENAME} (author, content) VALUES($1, $2) RETURNING *`;
        console.log(query, [data['author'], data['content']]);
        return db.one(query, [data['author'], data['content']]);
    }

    static getTotal() {
        let query = `SELECT count(*) FROM ${TABLENAME}`;
        console.log(query);
        return db.one(query, [], a => +a.count);
    }

    static search(param, order) {
        // make sure order is a valid input, warn if its not and reset to asc.
        if(!(order === 'ASC' || order === 'DESC')) {
            console.log('Warning: Unknown order passed to search. Resetting to ascending order.');
            order = 'ASC';
        }
        // let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND content ILIKE '%${param}%' OR author ILIKE '%${param}%'`;
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND author = $1 ORDER BY id ${order}`;
        console.log(query, param);
        return db.any(query, [param]);
    }

    static htmlParse(htmlData) {
        console.log('Parsing following HTML for sanitization:', htmlData);
        let result = xss(htmlData, {
            whiteList: {
                p: true,
                h4: true,
                div: ['class'],
                a: ['class', 'onclick', 'data-blogid', 'data-blogauthor', 'data-blogcontent']
            },
            stripIgnoreTag: true
        });
        return result;
    }
}

module.exports = CarDb;