const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const redis = require('./redis');
const app = express();
app.use(helmet());
app.use(morgan('dev'));
require('./read')()
function findDomains(name) {
    return new Promise((res, rej) => {
        redis.HGET('entities', name, async (err, reply) => {
            if (err) rej(`ERROR: ${name} not found`)
            if (reply !== null) {
                try {
                    const data = JSON.parse(reply)
                    let promiseArr = [];
                    for (const element of data.properties) {
                        promiseArr.push(findDomain(element))
                    }
                    res(await Promise.all(promiseArr))
                } catch (error) {
                    
                }
            } else {
                rej(`ERROR: ${name} not found`)
            }
        })
    })
}
function findDomain(name) {
    return new Promise((res, rej) => {
        redis.HGET('domains', name, (_, domain) => {
            if (domain !== null){
                res(JSON.parse(domain))
            } else{
                res({ domain: name })
            }
        })
    })
}
function findEntity(name) {
    return new Promise((res, rej) => {
        redis.HGET('entities', name, (err, reply) => {
            if (err) rej('Internal Error')
            if (reply !== null) {
                res(JSON.parse(reply))
            } else {
                rej('Entity Not Found!');
            }
        })
    })
}
app.get('/api/REST/', (req, res) => {
    redis.HKEYS('entities', (err, reply) => {
        res.json(reply)
    })
})
app.get('/api/REST/:name', async (req, res, next) => {
    try {
        const data = await findEntity(req.params.name)
        res.json(data)
    } catch (error) {
        res.status(404)
        next(error)
    }
})
app.get('/api/REST/:name/domains', async (req, res, next) => {
    try {
        const data = await findDomains(req.params.name)
        res.json(data)
    } catch (error) {
        res.status(404)
        next(error)
    }
})
app.get('/api/REST/:name/combine', async (req, res, next) => {
    try {
        const data = await findEntity(req.params.name)
        data.properties = await findDomains(req.params.name)
        res.json(data)
    } catch (error) {
        res.status(404)
        next(error)
    }
})
function notFound(req, res) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.json({
        message: error.message,
    });
}
function errorHandler(err, req, res) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
    });
}
app.use(notFound);
app.use(errorHandler);
app.listen({
    port: 8080
});