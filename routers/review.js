// 정원

const express = require('express');
const router = express.Router();
const Reviews = require("../schemas/review");

// 리뷰 작성
router.post("/", async (req, res, next) => {
    const {title, content} = req.body;
    const date = new Date();

    await Reviews.create({ title: title, content: content, date: date });

    res.json({ message: "success" });
});

// 리뷰 전체 가져오기
router.get("/", async (req, res, next) => {
    try {
        const reviews = await Reviews.find({ });

        res.json({ message: "success", reviews: reviews });
    } catch (err) {
        res.send({ err: err });
    }
});

// 리뷰 하나 가져오기
router.get("/:reviewId", async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Reviews.findOne({ _id: reviewId });

    res.json({ message: "success", review: review });
});

// 리뷰 하나 수정하기
router.put("/:reviewId", async (req, res, next) => {
    const { reviewId } = req.params;
    const { title, content } = req.body;

    const isReviewInReviews = await Reviews.findById( reviewId ).exec();

    if (isReviewInReviews) {
        await Reviews.updateOne({ _id: reviewId }, {$set: {title, content, date: new Date()}});
    }

    res.json({ message: "success" });
});

// 리뷰 하나 삭제하기
router.delete("/:reviewId", async (req, res, next) => {
    const { reviewId } = req.params;

    const isReviewInReviews = await Reviews.findById( reviewId ).exec();

    if (isReviewInReviews) {
        await Reviews.deleteOne({ _id: reviewId });
    }

    res.json({ message: "success" });
});



module.exports = router;