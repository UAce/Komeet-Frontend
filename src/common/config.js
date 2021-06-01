const dev = {
    baseURL: "http://localhost:4000"
};

const prod = {
    baseURL: "https://komeet.dev/api"
};

console.log(`ENV:`, process.env);
const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;
