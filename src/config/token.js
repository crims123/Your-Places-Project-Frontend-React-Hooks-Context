import axiosClient from '../api';

const tokenAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.authorization = token;
  } else {
    delete axiosClient.defaults.headers.authorization;
  }
};

export default tokenAuth;
