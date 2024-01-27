const bookService = require('../src/domains/v1/books/bookService');

const mockRequest = (body = {}, query = {}, params = {}) => ({
  body,
  query,
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('bookService available books', () => {
  test('it should return all available books', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const books = [
      {
        code: 'SHR-1',
        title: 'A Study in Scarlet',
        author: 'Arthur Conan Doyle',
        stock: 1,
      },
    ];

    await bookService.getAllAvailableBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 200,
        data: expect.arrayContaining(books),
      })
    );
  });
});

describe('bookService borrow book', () => {
  test('it should return error if book not found', async () => {
    const req = {
      params: {
        memberId: 'mem-c',
        bookId: 'book-a',
      },
    };
    const res = mockResponse();

    await bookService.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 404,
        message: 'Book not found',
      })
    );
  });
  test('it should return error if member not found', async () => {
    const req = {
      params: {
        memberId: 'mem-c',
        bookId: 'SHR-1',
      },
    };
    const res = mockResponse();

    await bookService.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 404,
        message: 'Member not found',
      })
    );
  });
  test('it should return error if member has penalty date', async () => {
    const req = {
      params: {
        memberId: 'M003',
        bookId: 'SHR-1',
      },
    };
    const res = mockResponse();

    await bookService.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 400,
        message: 'Member has a penalty cannot borrow a book please wait 3 days',
      })
    );
  });
  test('it should return error if member has max borrowed books', async () => {
    const req = {
      params: {
        memberId: 'M001',
        bookId: 'SHR-1',
      },
    };
    const res = mockResponse();

    await bookService.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 400,
        message:
          'Member has already borrowed the maximum number of books allowed',
      })
    );
  });
  test('it should return error if books out of stock', async () => {
    const req = {
      params: {
        memberId: 'M002',
        bookId: 'TW-11',
      },
    };
    const res = mockResponse();

    await bookService.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 400,
        message: 'Book is out of stock ',
      })
    );
  });
  test('it should return success if books successfully borrowed', async () => {
    const req = {
      params: {
        memberId: 'M002',
        bookId: 'SHR-1',
      },
    };
    const res = mockResponse();

    await bookService.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 201,
        message: 'Book borrowed successfully',
      })
    );
  });
});

describe('bookService return book', () => {
  test('it should return error if book not found', async () => {
    const req = {
      params: {
        memberId: 'mem-c',
        bookId: 'book-a',
      },
    };
    const res = mockResponse();

    await bookService.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 404,
        message: 'Book not found',
      })
    );
  });
  test('it should return error if member not found', async () => {
    const req = {
      params: {
        memberId: 'mem-c',
        bookId: 'SHR-1',
      },
    };
    const res = mockResponse();

    await bookService.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 404,
        message: 'Member not found',
      })
    );
  });
  test('it should return error if book is not borrowed by the member', async () => {
    const req = {
      params: {
        memberId: 'M002',
        bookId: 'NRN-7',
      },
    };
    const res = mockResponse();

    await bookService.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        code: 400,
        message: 'Book is not borrowed by the member',
      })
    );
  });
  test('it should return success if books successfully returned', async () => {
    const req = {
      params: {
        memberId: 'M002',
        bookId: 'SHR-1',
      },
    };
    const res = mockResponse();

    await bookService.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 201,
        message: 'Book returned successfully',
      })
    );
  });
});
