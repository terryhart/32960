import dotenv from "dotenv";

/**
 * init dotenv
 * priority: environment -> .env
 *
 * Available settings
 *
 * APP_PORT=9527
 * APP_AUTH=yutong:121,shenwo:222
 */

dotenv.config();

/**
 *
 * @param {string} name envrionment name
 * @param {object} opt option with { required, default }
 * @returns {*} value
 */

export function env(name, opt = {}) {
  const value = process.env[`APP_${name.toUpperCase()}`];

  if (opt.required && !value) {
    throw new Error(`environment ${name} is required`);
  }

  return value || opt.default;
}

/**
 * app
 */

export const PORT = env("PORT", { default: 9527 });

/**
 *  平台登录账号和密码
 */
export const AUTH = env("AUTH", { default: "yutong:121,shenwo:222" });

/**
 * tcpcopy 目的地
 */
export const DUP_DEST = env("DUP_DEST", { default: "" });
export const DUP_HOST = env("DUP_HOST", { default: "" });
export const DUP_PORT = env("DUP_PORT", { default: "" });
