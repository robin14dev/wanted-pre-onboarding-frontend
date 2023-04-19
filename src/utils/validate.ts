export const validMsg = {
  email: "이메일은 '@'가 포함되어야 합니다",
  password: "비밀번호는 8자 이상이어야 합니다.",
};

export const checkValid = (type: string, value: string): boolean => {
  switch (type) {
    case "email":
      return value.includes("@") ? true : false;
    case "password":
      return value.length >= 8 ? true : false;

    default:
      return false;
  }
};
