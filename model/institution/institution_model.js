const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const institutionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true  // Ensure the institution name is unique
  },
  logo: {
    type: String,  // URL or path to the logo image
    required: true
  },
  institutionType: {
    type: String,
    required: true  // Specify the type of institution (e.g., College, University)
  },
  boardAffiliation: {
    type: String,
    required: true  // Specify the board or affiliation (e.g., CBSE, ICSE)
  },
  instituteCode: {
    type: String,
    required: true,  // Unique code for the institution
    unique: true
  },
  address: {
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  contactDetails: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']  // Validate email format
    }
  },
  website: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+\..+/, 'Please enter a valid website URL']  // Validate URL format
  }
}, {
  timestamps: true  // Automatically manage createdAt and updatedAt fields
});

const Institution = model('Institution', institutionSchema);

module.exports = Institution;
