const memberService = require('../src/domains/v1/members/memberService');

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

describe('memberService get all members', () => {
  test('it should return all members with history borrowed books', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const members = [
      {
        code: 'M003',
        membername: 'Putri',
        books_borrowed_now: '0',
        books_returned_on_time: '14',
        books_returned_late: '0',
      },
    ];

    await memberService.getAllMembers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 200,
        data: expect.arrayContaining(members),
      })
    );
  });
});
