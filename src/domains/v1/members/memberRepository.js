const db = require('../../../../infrastructures/database');

const memberRepository = {
  getAllMembers: async () => {
    const query = `
       SELECT
            m.Code,
            m.MemberName,
            COUNT(CASE WHEN bb.Status = 'Borrowed' THEN bb.BorrowedBookID END) AS Books_Borrowed_Now,
            COUNT(CASE WHEN bb.Status = 'Returned On Time' THEN bb.BorrowedBookID END) AS Books_Returned_on_Time,
            COUNT(CASE WHEN bb.Status = 'Returned Late' THEN bb.BorrowedBookID END) AS Books_Returned_Late
        FROM
            Members m
        LEFT JOIN BorrowedBook bb ON m.Code = bb.MemberID
        GROUP BY
            m.Code, m.MemberName;
    `;
    const members = await db.any(query);
    return members;
  },
  getMemberById: async (id) => {
    const query = 'SELECT * FROM members WHERE code = $1';
    const members = await db.oneOrNone(query, id);
    return members;
  },
  checkPenaltyStatus: async (id) => {
    const query = `
        SELECT * 
        FROM Members 
        WHERE Code = $1
        AND PenaltyDate > CURRENT_DATE
    `;
    const result = await db.oneOrNone(query, id);
    return result;
  },
  updatePenalty: async (id, penaltyEndDate) => {
    const query = `
        UPDATE Members
        SET PenaltyDate = $2
        WHERE Code = $1
        RETURNING *
    `;
    const result = await db.one(query, [id, penaltyEndDate]);
    return result;
  },
};

module.exports = memberRepository;
