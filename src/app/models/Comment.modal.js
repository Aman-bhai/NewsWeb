import mongoose from 'mongoose';


var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const commentSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique:true
  },
  comments: [{
    comment: { type: String, required: true },
    newsId: { type: String, required: true }
  }],
  dates: [String], // Array of date strings
  likes: [String], // Array of newsIds that the user has liked
  // Array of user emails who liked the news
});
export const Comments = mongoose.models.Comments || mongoose.model('Comments', commentSchema);