const requiresAuth = (gssp) => {
  return async (context) => {
    const savedUserData = context.req.cookies.user_data;
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
