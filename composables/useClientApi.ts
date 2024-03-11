const baseURL = 'https://app.ihitreset.com/resetcrm';

export function useApiFetch() {
  return {
    async fetch(url, options = {}) {
      // Move the retrieval inside the fetch function
      const userAuth = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        console.lig
      const headers = {
        Authorization: userAuth ? `Bearer ${userAuth}` : '',
        accept: 'application/json',
        ...options.headers,
      };

      const response = await fetch(`${baseURL}${url}`, { ...options, headers });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  };
}

  