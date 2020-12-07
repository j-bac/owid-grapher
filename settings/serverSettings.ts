// This is where server-side only, potentially sensitive settings enter from the environment
// DO NOT store sensitive strings in this file itself, as it is checked in to git!

import { serverSettings } from "./localSettings"

// todo: handle when someone overrides these 3, the derived vars
const DB_NAME = "owid"
const DB_USER = "root"
const DB_PASS = ""
const DB_HOST = "localhost"
const DB_PORT = 3306
const BASE_DIR = __dirname + "/../../"

export interface ServerSettings {
    ENV: "development" | "production"
    BASE_DIR: string
    BAKED_SITE_DIR: string
    SECRET_KEY: string
    DB_NAME: string
    DB_USER: string
    DB_PASS: string
    DB_HOST: string
    DB_PORT: number
    WORDPRESS_DB_NAME: string
    WORDPRESS_DB_USER: string
    WORDPRESS_DB_PASS: string
    WORDPRESS_DB_HOST: string
    WORDPRESS_DB_PORT: number
    WORDPRESS_API_USER: string
    WORDPRESS_API_PASS: string
    WORDPRESS_DIR: string
    SESSION_COOKIE_AGE: number
    ALGOLIA_SECRET_KEY: string
    STRIPE_SECRET_KEY: string
    EMAIL_HOST: string
    EMAIL_PORT: number
    EMAIL_HOST_USER: string
    EMAIL_HOST_PASSWORD: string
    HTTPS_ONLY: boolean
    SLACK_ERRORS_WEBHOOK_URL: string
    GIT_DATASETS_DIR: string // Where the git exports go
    TMP_DIR: string
    UNCATEGORIZED_TAG_ID: number
    BAKE_ON_CHANGE: false
    DEPLOY_QUEUE_FILE_PATH: string
    DEPLOY_PENDING_FILE_PATH: string
    CLOUDFLARE_AUD: string
}

const defaultSettings: ServerSettings = {
    ENV: "development",
    BASE_DIR,
    BAKED_SITE_DIR: `${BASE_DIR}/bakedSite`, // Where the static build output goes
    SECRET_KEY: "fejwiaof jewiafo jeioa fjieowajf isa fjidosajfgj",
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
    WORDPRESS_DB_NAME: DB_NAME,
    WORDPRESS_DB_USER: DB_USER,
    WORDPRESS_DB_PASS: DB_PASS,
    WORDPRESS_DB_HOST: DB_HOST,
    WORDPRESS_DB_PORT: DB_PORT,
    WORDPRESS_API_USER: "",
    WORDPRESS_API_PASS: "",
    SESSION_COOKIE_AGE: 1209600,
    ALGOLIA_SECRET_KEY: "",
    STRIPE_SECRET_KEY: "",
    // Settings for automated email sending, e.g. for admin invites
    EMAIL_HOST: "smtp.mail.com",
    EMAIL_PORT: 443,
    EMAIL_HOST_USER: "user",
    EMAIL_HOST_PASSWORD: "password",
    // Wordpress target settings
    WORDPRESS_DIR: "",
    HTTPS_ONLY: true,
    // Node slack webhook to report errors to using express-error-slack
    SLACK_ERRORS_WEBHOOK_URL: "",
    GIT_DATASETS_DIR: `${BASE_DIR}/datasetsExport`, //  Where the git exports go
    TMP_DIR: "/tmp",
    UNCATEGORIZED_TAG_ID: 375,
    // Should the static site output be baked when relevant database items change?
    BAKE_ON_CHANGE: false,
    DEPLOY_QUEUE_FILE_PATH: `${BASE_DIR}/.queue`,
    DEPLOY_PENDING_FILE_PATH: `${BASE_DIR}/.pending`,
    CLOUDFLARE_AUD: "",
}

export default {
    ...defaultSettings,
    ...serverSettings,
}
