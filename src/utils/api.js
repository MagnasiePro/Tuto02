import axios from 'axios';

export const getUsers = async () => {
  return Promise.resolve(
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(result => {
        return result?.data;
      })
      .catch(error => {
        console.error(error);
      }),
  );
};
