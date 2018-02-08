const db = require('./db');
const xss = require('xss');
// const bcrypt = require('bcrypt');

const TABLENAME = 'users';

class UserDb {
    static getLoginInfo(username, password) {
        let query = `SELECT * FROM ${TABLENAME} WHERE username = $1 AND password = $2`;
        console.log(query, `${username}:${password}`);
        return db.oneOrNone(query, [username, password]);
    }

    static getOne(id) {
        id = parseInt(id);
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND id = $1`;
        console.log(query, id);
        return db.oneOrNone(query, [id]);
    }

    static getOneByUserName(username) {
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND username = $1`;
        console.log(query, username);
        return db.oneOrNone(query, [username]);
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
        let query = `UPDATE ${TABLENAME} SET username = $1, password = $2 WHERE is_deleted=false AND id = $3 RETURNING *`;
        console.log(query, data['username'], data['password'], id);
        return db.one(query, [data['username'], data['password'], id]);
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
        let query = `INSERT into ${TABLENAME} (username, password) VALUES($1, $2) RETURNING *`;
        console.log(query, [data['username'], data['password']]);
        return db.one(query, [data['username'], data['password']]);
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
        let query = `SELECT * FROM ${TABLENAME} WHERE is_deleted=false AND username = $1 ORDER BY id ${order}`;
        console.log(query, param);
        return db.any(query, [param]);
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

module.exports = UserDb;