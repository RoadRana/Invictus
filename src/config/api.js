const config = {
  baseURL:
    import.meta.env.VITE_API_BASE_URL ,
  token:
    import.meta.env.VITE_API_TOKEN 
};

// Remove trailing slash from baseURL for consistency
if (config.baseURL.endsWith("/")) {
  config.baseURL = config.baseURL.slice(0, -1);
}

export default config;
