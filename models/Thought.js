const {Schema, model, Types} = require ('mongoose');
const moment = require ('moment');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: [280]
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    }
);
const ThoughtSchema = new Schema ({
        thoughtText: {
            type: String,
            required: true,
            minlength: [1],
            maxlength: [280]
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
        },
        {
            toJSON: {
            virtual: true,
            getters: true
            }
        }
    
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  // create the Thought model using the UserSchema
const Thought = model('Thought', ThoughtSchema);
//const Reaction = model ('Reaction', ReactionSchema);

// export the Thought and Reaction model
//module.exports = { Thought , Reaction };

module.exports = Thought ;