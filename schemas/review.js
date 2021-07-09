const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({  // 참조 방식은 정훈님이 알려주시기로!
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    title: {
        Type: String,
        require: true,
    },
    content: {
        Type: String,
        require: true,
    }
});

ReviewSchema.virtual('reviewId').get(() => {
    return this._id.toHexString();
}); // make front-end refer this value

ReviewSchema.set("toJSON", {
    vituals: true,
});

module.exports = mongoose.model("Review", ReviewSchema);