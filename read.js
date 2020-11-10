const util = require('util');
const fs = require('fs');
const redis = require('./redis');
const syncDir = util.promisify(fs.readdir);
const syncFile = util.promisify(fs.readFile);

function dirRead(dir) {
    syncDir(`./data/${dir}/`).then(async (dirValue) => {
        for (let i = 0; i < dirValue.length; i++) {
            const element = dirValue[i];
            try {
                const result = await syncFile(`./data/${dir}/${element}`, 'utf-8').then((value) => {
                    return {
                        parsed: JSON.parse(value),
                        raw: value
                    }
                })
                const name = dir === 'domains' ? result.parsed.domain : result.parsed.name;
                redis.HSETNX(dir, name, result.raw)
            } catch (error) {
                console.error(error)
            }
        }
    }).catch((err) => reject(err));
}

function init() {
    const dirArray = ['domains', 'entities'];
    for (let i = 0; i < dirArray.length; i++) {
        const element = dirArray[i];
        dirRead(element)
    }
}
module.exports = init