var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var detailSchema = new Schema(
  {
        event:{
        type: Schema.Types.ObjectId,
        ref: "event"
        },
        customer:{
            type:Schema.Types.ObjectId,
            ref:"user"
        },
        name:{
          type:String
        },
        ticketleft:{
          type:Number
        }
        
  },
  { timestamps: true }
);


var Detail = mongoose.model("detail", detailSchema);

module.exports = Detail;
