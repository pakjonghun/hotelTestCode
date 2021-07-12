const di = require("../controllers");
const Room = require("../schemas/room");
const Book = require("../schemas/book");
const httpMocks = require("node-mocks-http");
const bodyVal = {
  roomId: "1",
  adult: 1,
  kid: 1,
  startDate: "2021-07-12T02:02:53.438Z",
  endDate: "2021-07-13T02:02:53.438Z",
};
const tempBook = {
  price: 3000,
  roomId: "1",
  adult: 1,
  kid: 1,
  startDate: new Date("2021-07-12T02:02:53.438Z"),
  endDate: new Date("2021-07-13T02:02:53.438Z"),
};

req = httpMocks.createRequest();
res = httpMocks.createResponse();
Room.findOne = jest.fn();
Book.create = jest.fn();
next = jest.fn();

describe("book text", () => {
  beforeEach(() => {
    req.body = bodyVal;
    Room.findOne = jest.fn();
    Book.create = jest.fn();
  });
  it("should return function", () => {
    expect(typeof di.dividePost).toBe("function");
  });

  it("should call with findOne", async () => {
    await di.dividePost(req, res, next);
    expect(Room.findOne).toBeCalledWith({ _id: bodyVal.roomId });
  });

  it("should call with book.create", async () => {
    Room.findOne.mockReturnValue({ name: "1", image: "!", price: 3000 });
    await di.dividePost(req, res, next);
    expect(Book.create).toBeCalledWith(tempBook);
  });

  it("should return fail", async () => {
    Room.findOne.mockReturnValue(null);
    await di.dividePost(req, res, next);
    expect(res._getJSONData()).toStrictEqual({ message: "fail" });
  });

  it("should return error", async () => {
    const error = { errorMessage: "i don't know what..?" };
    const promiseReject = Promise.reject(error);
    Room.findOne.mockReturnValue(promiseReject);
    await di.dividePost(req, res, next);
    expect(res._getJSONData()).toStrictEqual({ message: "fail" });
  });
});

describe("devide Get Book by Id", () => {
  beforeEach(() => {
    req.params.bookId = "1";
    Room.findOne = jest.fn();
    Book.create = jest.fn();
    Book.find = jest.fn();
  });

  it("shoule be function ", () => {
    expect(typeof di.divideGetBook).toBe("function");
  });

  it("shoule call with find function", async () => {
    const books = [{ 1: 1 }];
    Book.find.mockReturnValue(books);
    await di.divideGetBook(req, res, next);
    expect(Book.find).toBeCalledWith({});
    expect(res._getJSONData()).toStrictEqual({ books });
  });
});

describe("getBookById test", () => {
  const book = { id: "1" };

  beforeEach(() => {
    req.body.params = { bookId: "1" };
    Book.findById = jest.fn();
  });

  it("should be function", () => {
    expect(typeof di.divideGetBookById).toBe("function");
  });

  it("should call with findById", async () => {
    Book.findById.mockReturnValue(book);
    await di.divideGetBookById(req, res, next);
    expect(Book.findById).toBeCalledWith(req.params.bookId);
    expect(res._getJSONData()).toStrictEqual({ book });
  });
});

describe("book edit put method test", () => {
  const tempBook = {
    price: 3000,
    roomId: "1",
    adult: 1,
    kid: 1,
    startDate: new Date("2021-07-12T02:02:53.438Z"),
    endDate: new Date("2021-07-13T02:02:53.438Z"),
  };
  const room = { name: "1", image: "!", price: 3000 };

  delete tempBook.roomId;

  beforeEach(() => {
    req.params = { bookId: "1" };
    req.body = tempBook;
    Book.exists = jest.fn();
    Room.findOne = jest.fn();
    Book.updateOne = jest.fn();
  });

  it("should function type", () => {
    expect(typeof di.dividePut).toBe("function");
  });

  it("should be called with methods", async () => {
    Book.exists.mockReturnValue(true);
    Room.findOne.mockReturnValue(room);
    await di.dividePut(req, res, next);
    expect(Book.exists).toBeCalledTimes(1);
    expect(Room.findOne).toBeCalledTimes(1);
    expect(Book.updateOne).toBeCalledWith(
      { _id: "1" },
      { $set: { ...tempBook } }
    );
  });
});

describe("deleteBook test", () => {
  beforeEach(() => {
    req.params = { bookId: "1" };
    Book.exists = jest.fn();
    Book.remove = jest.fn();
  });

  it("should function", () => {
    expect(typeof di.divideDelete).toBe("function");
  });

  it("should called with remove method", async () => {
    Book.exists.mockReturnValue(true);
    await di.divideDelete(req, res, next);
    expect(Book.remove).toBeCalledWith({ _id: "1" });
    expect(res._getJSONData()).toStrictEqual({ message: "success" });
  });
});
