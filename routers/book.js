const di = require("../controllers");

const express = require("express");
const router = express.Router();
const Book = require("../schemas/book");
const Room = require("../schemas/room");

router.post("/", di.dividePost);

router.get("/", di.divideGetBook);

router.get("/:bookId", di.divideGetBookById);

router.put("/:bookId", di.dividePost);

router.delete("/:bookId", di.divideDelete);

module.exports = router;
