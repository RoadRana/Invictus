const config = {
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://3b980835104d.ngrok-free.app/",
  token:
    import.meta.env.VITE_API_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU4NjQ2Mjc5LCJpYXQiOjE3NTYwNTQyNzksImp0aSI6ImRjOTc5ZjA2YzhhMTRmYzZiMWU1ODIxOThhMThkZjRiIiwidXNlcl9pZCI6NH0.MJV6D_vsBuYoZjceV4dYBimNBx9L9TB5Z_UAyDKsSFI",
};

// Remove trailing slash from baseURL for consistency
if (config.baseURL.endsWith("/")) {
  config.baseURL = config.baseURL.slice(0, -1);
}

export default config;
