const request = require("supertest");
const app = require("../app");

const tempBook = {
  price: 3000,
  roomId: "60e83d913189223c21f26195",
  adult: 1,
  kid: 1,
  startDate: new Date("2021-07-12T02:02:53.438Z"),
  endDate: new Date("2021-07-13T02:02:53.438Z"),
};

it("GET /api/book", async () => {
  const response = await request(app).get("/api/book");
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeDefined();
  expect(Array.isArray(response.body.books)).toBeTruthy();
});

it("POST /api/book", async () => {
  const response = await request(app).post("/api/book").send(tempBook);
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("success");
});

it("GET /api/book/:bookId", async () => {
  const response = await request(app).get("/api/book/60e9060297f02d117baabdb3");
  expect(response.statusCode).toBe(200);
  expect(response.body.book.kid).toBe(4);
});

delete tempBook.roomId;
it("PUT /api/book/:bookId", async () => {
  const response = await request(app)
    .put("/api/book/60e9060297f02d117baabdb3")
    .send(tempBook);

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("success");
});

it("DELETE /api/book/:bookId", async () => {
  const response = await request(app).delete(
    "/api/book/60e9060297f02d117baabdb3"
  );
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("success");
});
