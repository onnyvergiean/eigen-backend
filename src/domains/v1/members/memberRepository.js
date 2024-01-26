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
