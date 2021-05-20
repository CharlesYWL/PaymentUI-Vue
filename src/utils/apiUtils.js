const API_ROOT = process.env.VUE_APP_API_ROOT;

const responseBody = (response) => {
  if (!response.ok) {
    return response.json().then((obj) => {
      throw obj;
    });
  } else return response.json();
};
const getHeader = () => {
  const tokenId =
    localStorage.getItem('tokenId') || sessionStorage.getItem('tokenId');
  return {
    'content-type': 'application/json',
    tokenId: tokenId || '',
  };
};
const request = {
  del: (url) => {
    return fetch(url, { method: 'DELETE' });
  },
  get: (url) => {
    const requestOptions = {
      method: 'GET',
      headers: getHeader(),
    };
    return fetch(API_ROOT + url, requestOptions).then(responseBody);
  },
  put: (url, body) => {
    const requestOptions = {
      method: 'PUT',
      headers: getHeader(),
      body: JSON.stringify(body),
    };
    return fetch(API_ROOT + url, requestOptions).then(responseBody);
  },
  // patch: (url, body) => {
  //   console.log('request:patch not supported yet.');
  // },
  post: (url, body) => {
    const requestOptions = {
      method: 'POST',
      headers: getHeader(),
      body: JSON.stringify(body),
    };
    return fetch(API_ROOT + url, requestOptions).then(responseBody);
  },
  // upload: (url, file) => {
  //   console.log('request:upload not supported yet.');
  // },
};

// api part
const getItem = (item) => {
  return request.get(`/stripe/get-goods/${item}`);
};

const getAllItems = () => {
  return request.get('/stripe/get-goods');
};

export { request, getItem, getAllItems };
