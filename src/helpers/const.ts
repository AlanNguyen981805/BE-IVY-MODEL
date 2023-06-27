const prefixApi = process?.env?.PREFIX || "api";
const versionApi = process.env.VERSION_API || "v1";

const api = "/" + prefixApi + "/" + versionApi;

export const DOMAIN = {
  CATEGORIES: api + "/categories",
};

export const INFO_RESPONSE = {
    SUCCESS: 1,
    ERROR: 0
}