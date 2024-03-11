export default () => {
  const config = useRuntimeConfig();
  const imageUrl = config.public.imageUrl;

  const getUrl = (url: string) => {
    const timestamp = new Date().getTime();
    return `${imageUrl}/${url}?timestamp=${timestamp}`;
  };

  return {
    getUrl,
  };
};
