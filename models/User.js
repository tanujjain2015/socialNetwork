
const {Schema, model} = require ('mongoose');
const Thought = require ('./Thought');
const moment = require ('moment');

const UserSchema = new Schema ({
        username : {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserSchema'
            }
        ]
    },
    {
        toJSON : {
            virtual: true,
            getters: true
        },
        id: false

    }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  // create the User model using the UserSchema
const User = model('User', UserSchema );

// export the User model
module.exports = User;