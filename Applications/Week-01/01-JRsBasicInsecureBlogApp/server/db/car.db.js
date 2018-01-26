const db = require('./db');

const TABLENAME = 'cars';

class CarDb {
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
        // Object.keys(data).forEach((key) => {
        //     params.push(`${key} = '${data[key]}'`);
        // });
        let query = `UPDATE ${TABLENAME} SET author = $1, content = $2 WHERE is_deleted=false AND id = ${id} RETURNING *`;
        console.log(query, data['author'], data['content']);
        return db.one(query, [data['author'], data['content']]);
    }

    static deleteOne(id) {
        id = parseInt(id);
        //let query = `DELETE FROM ${TABLENAME} WHERE id = ${id}`;
        let query = `UPDATE ${TABLENAME} SET is_deleted=true WHERE id = ${id}`
        console.log(query);
        return db.result(query, [], r => r.rowCount);
    }

    static insertOne(data) {
        let params = [];
        let values = [];
        Object.keys(data).forEach((key) => {
            params.push(key);
            values.push(`'${data[key]}'`);
        });
        let query = `INSERT into ${TABLENAME} (${params.join()}) VALUES(${values.join()}) RETURNING *`;
        console.log(query);
        return db.one(query);
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
}

module.exports = CarDb;