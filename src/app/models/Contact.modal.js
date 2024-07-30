import { timeStamp } from "console";
import { model, models, Schema } from "mongoose";


var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserInfoSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: [{ type: String }],
  message: [{ type: String }],
  date: [{ type: String, default: Date }]
}, { timestamps: true });

export const Contact = models?.Contact || model('Contact', UserInfoSchema);