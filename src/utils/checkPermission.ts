const checkPermission = (user: any, code: string) => {
  return user?.actions?.some((item: any) => item.code === code);
};

export default checkPermission;
