const express = require('express');
const router = express.Router();
const Room = require("../schemas/room");

// 방정보 가져오기
router.get("/", async (req, res) => {
  try {
      const rooms = await Room.find({}).exec();
      res.json({message : true, rooms : rooms });
  } catch (err) {
      res.send({ err: err });
  }
});
// 방 이미지 슬라이드
router.post("/", async (req, res) => {
  const { name, image, price } = req.body;
  await Room.create({ name, image, price });

  res.send("Success");
});






module.exports = router;