export default () => {
  const config = useRuntimeConfig();
  const imageUrl = config.public.CDN_URL;

  const getUrl = (url: string) => {
   
    return `${imageUrl}/${url}`;
  };
  console.log(getUrl)
  return {
    getUrl,
  };
};
