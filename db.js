const mongoose = require('mongoose')

var maongo_url = "mongodb+srv://vibhor:1234@cluster0-5j4d2.mongodb.net/book-my-events?retryWrites=true&w=majority"
mongoose.connect(maongo_url ,{
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true

}).then(function(){
    console.log('database connected')
}).catch(function(err){
    console.log('Error in database')
})