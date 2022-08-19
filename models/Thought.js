
const { Schema, Types } = require('mongoose');
const formatTime = (timestamp) => new Date(timestamp).toLocaleString('en-US');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatTime,
    }
},
    {
        toJSON: {
            getters: true
        },
    }
);

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatTime,
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

module.exports = Thought;