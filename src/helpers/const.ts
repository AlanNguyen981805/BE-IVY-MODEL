const prefixApi = process?.env?.PREFIX || "api";
const versionApi = process.env.VERSION_API || "v1";

const api = "/" + prefixApi + "/" + versionApi;

export const DOMAIN = {
  CATEGORIES: api + "/categories",
  PRODUCT: api + "/products",
  SIZE: api + "/size",
  COLOR: api + "/color",
  SLIDER: api + "/slider",
  SETTING: api + "/setting",
  AUTH: api + "/auth"
};

export const INFO_RESPONSE = {
    SUCCESS: 1,
    ERROR: 0
}