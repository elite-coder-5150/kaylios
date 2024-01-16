import { db } from '../server';
export class  Utility {
    getResults = (sql, values): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}