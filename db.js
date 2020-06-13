const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/book-my-events' || process.env.MONGODB_URL ,{
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true

}).then(function(){
    console.log('database connected')
}).catch(function(err){
    console.log('Error in database')
})