const requiresAuth = (gssp) => {
  return async (context) => {
    const savedUserData = context.req.cookies.auth_token;
    if (!savedUserData) {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }
    return gssp(context);
  };
};

export default requiresAuth;
