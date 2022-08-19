const { Schema, model } = require('mongoose');
const Users = mongoose.model("Users", userSchema);

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique:  true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});


userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

module.exports = Users