import axios from 'axios';

export default ({ app }) => {
  const strapiApi = axios.create({
    baseURL: 'http://localhost:1337', // Replace with your Strapi API URL
  });

  app.$strapiApi = strapiApi;
};
