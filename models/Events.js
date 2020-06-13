var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema(
  {
        name:{
          type: String
        },
        price:{
          type: Number
        },
        available:{
          type: Number
        },
        location:{
          type: String
        },
        category:{
          type: String
        },
        date: { 
          type: String
        },
        ticketmanager:{
          type: String
        },
        owner: {
          type:Schema.Types.ObjectId,
          ref:"user"
        },
        customers:[
            {
            type:Schema.Types.ObjectId,
            ref:"detail"
        }

        ]
  },
  { timestamps: true }
);


var Event = mongoose.model("event", eventSchema);

module.exports = Event;
