const JWT_CONSTANT = {
  EXP_TIME: {
    ACCESS: '1d',
    REFRESH: '2d',
  },
  SECRETS: {
    ACCESS: 'top_secret',
    REFRESH: 'ass_top_secret',
  },
};

export default Object.freeze(JWT_CONSTANT);
