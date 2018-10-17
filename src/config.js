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
 * @param {*} name envrionment name
 * @param {*} option option with { required, default }
 * @returns {*} value
 */

export function env(name, option) {
  const value = process.env[name];

  if (option.required && !value) {
    throw new Error(`environment ${name} is required`);
  }

  return value || option.default;
}

/**
 * app
 */

export const PORT = env("APP_PORT", { default: 9527 });

/**
 *  平台登录账号和密码
 */
export const AUTH = env("APP_AUTH", { default: "yutong:121,shenwo:222" });
