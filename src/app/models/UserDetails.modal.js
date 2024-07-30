import {model, models, Schema} from "mongoose";

const UserDetailSchema = new Schema({
  email: {type: String, required: true},
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
  phone: {type: String},
}, {timestamps: true});

export const UserDetails = models?.UserDetails || model('UserDetails', UserDetailSchema);