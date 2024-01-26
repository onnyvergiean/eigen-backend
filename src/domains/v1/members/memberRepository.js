const db = require('../../../../infrastructures/database');

const memberRepository = {
  getAllMembers: async () => {
    const query = 'SELECT * FROM members';
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
        WHERE MemberID = $1
        AND PenaltyStatus = FALSE
    `;
    const result = await db.oneOrNone(query, memberId);
    return result;
  },
};

module.exports = memberRepository;
