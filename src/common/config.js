const dev = {
    baseURL: "http://localhost:4000"
};

const prod = {
    baseURL: "https://komeet.dev"
};

const commonConfig = {
    paths: {
        event: "api/events",
        signin: "api/signin"
    }
};

console.log(`Running [${process.env.NODE_ENV}] environment`);
const envConfig = process.env.NODE_ENV === "production" ? prod : dev;
const config = {
    ...commonConfig,
    ...envConfig
};
export default config;
