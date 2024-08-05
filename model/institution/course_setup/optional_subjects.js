const {Schema, model} = require('mongoose');

const optionalSubjectSchema = new Schema({
    courseName: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    sem: {
      type: String,
      required: true
    },
    optionalSubjects: [{
      type: String,
      required: true
    }]
  }, {
    toJSON: { getters: true },
    toObject: { getters: true }
  });
  
  const OptionalSubject = model('OptionalSubject', optionalSubjectSchema);
  
  module.exports = OptionalSubject;
  