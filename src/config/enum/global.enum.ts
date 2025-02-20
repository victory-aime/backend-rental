enum BASE_APIS_URL {
  UNSECURED = '_api/v1/unsecured',
  SECURED = '_api/v1/secure',
}
const PAGINATION = {
  INIT: 1,
  PAGE_SIZE: 5,
};

enum SWAGGER_TAGS {
  AUTH_MANAGEMENT = 'auth-management',
  PRODUCTS_MANAGEMENT = 'products-management',
  USER_MANAGEMENT = 'user-management',
}

export { BASE_APIS_URL, PAGINATION, SWAGGER_TAGS };
