const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({  // 참조 방식은 정훈님이 알려주시기로!
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     require: true,
    // },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    adult: {
        Type: Number,
        default: 0,
    },
    kid: {
        Type: Number,
        default: 0,
    }
});

BookSchema.virtual('bookId').get(() => {
    return this._id.toHexString();
}); // make front-end refer this value

BookSchema.set("toJSON", {
    vituals: true,
});

module.exports = mongoose.model("Book", BookSchema);