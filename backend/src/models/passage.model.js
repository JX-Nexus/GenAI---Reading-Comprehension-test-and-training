import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
    text: {
      type: String,
      required: false 
    },
    answer: {
      type: String,
      required: false
    }
  })

const userSchema = new Schema({

    text: {
            type: String,
            required: [true, 'passage is required'],
            index: true,
           },
    userId: {
            type:Schema.Types.ObjectId,
            ref: "User"
            },
    genres:{
        type: [String]
    },
    bookType:{
        type:String
    },
    points:{
      type: String
    },
    questions :[questionSchema]

    })

    const UserPassage = model('UserPassage', userSchema);

    export default UserPassage;