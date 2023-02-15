export const validInfo = {
  rgx: {
    email: /^.*(@).*/,
    password: /^.{8,}$/,
  },

  message: {
    email: "이메일은 @을 포함해야 합니다",
    password: "비밀번호는 8자 이상이어야 합니다",
  },
};

export const validate = (type, value) => {
  return validInfo.rgx[type].test(value) ? true : false;
};
