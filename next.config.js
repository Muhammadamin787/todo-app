/**
 * @format
 * @type {import("next").NextConfig}
 */

const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: process.env.BASE_URL,
        ENDPOINT: process.env.ENDPOINT,
        PROJECT_ID: process.env.PROJECT_ID,
        DB_ID: process.env.DB_ID,
        BOARDS_ID: process.env.BOARDS_COLLECTION_ID,
        COLUMNS_ID: process.env.COLUMNS_COLLECTION_ID,
        TASKS_ID: process.env.TASKS_COLLECTION_ID
    }
};

module.exports = nextConfig;
