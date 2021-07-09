// 정훈

const express = require("express");
const router = express.Router();
const Book = require("../schemas/book");
const Room = require("../schemas/review");

//예약할때 고를 방 정보 넘겨주기 이거 필요없나?;;;;

router.post("/", async (req, res) => {
  const { roomId, adult, kid } = req.body;
  const date = new Date();

  try {
    const book = await Book.create({ roomId, date, adult, kid });

    return res.json({ message: true, bookId: book._id });
  } catch (e) {
    console.log(e);

    return res.status(500).json({ message: false });
  }
});

router.get('/', async (req, res) => {
  const books = await Book.find({ });

  console.log(books);

  res.send({ books });
})

router.patch("/edit/:bookId", async (req, res) => {
  try {
    const { bookId: _id } = req.params;

    const isExist = await Book.exists({ _id });
    if (!isExist) {
      return res.status(404).json({ message: false });
    }

    await Book.updateOne({ _id }, { $set: req.body });

    return res.json({ message: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: false });
  }
});

router.delete("/delete/:bookId", async (req, res) => {
  const { bookId: _id } = req.params;
  try {
    const isExist = await Book.exists({ _id });
    if (!isExist) {
      return res.status(404).json({ message: false });
    }

    await Book.remove({ _id });
    return res.json({ message: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: false });
  }
});

module.exports = router;