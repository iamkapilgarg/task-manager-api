const mongoose = require('mongoose')


mongoose.connect('mongodb://iamkapilgarg:kapil7030@cluster0-shard-00-00-zzlbn.mongodb.net:27017,cluster0-shard-00-01-zzlbn.mongodb.net:27017,cluster0-shard-00-02-zzlbn.mongodb.net:27017/task-manager-app?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin', {
    //mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})