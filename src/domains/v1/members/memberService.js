const memberRepository = require('./memberRepository');
const memberService = {
  getAllMembers: async (req, res) => {
    try {
      const members = await memberRepository.getAllMembers();
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: members,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: error.message,
      });
    }
  },
};

module.exports = memberService;
