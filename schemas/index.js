const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/14hotel"
// const url = "mongodb://????:27017/admin"

const connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ignoreUndefined: true,
    })
    .catch(err => console.log(err));
};

mongoose.connection.on('error', err => {
    console.log("mongoDB connection error", err);
});

module.exports = connect;