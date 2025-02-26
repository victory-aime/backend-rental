import { BASE_APIS_URL } from '_config/enum/global.enum';

export const APIS_URL = {
  AUTH_MANAGEMENT: {
    GLOBAL_ROUTES: `${BASE_APIS_URL.UNSECURED}/auth`,
    SIGN_IN: 'login',
    REFRESH_TOKEN: 'refresh-token',
    LOGOUT: 'logout',
    SIGN_UP: 'sign-up',
    SEND_OTP: 'send-otp',
    VALIDATE_OTP: 'validate-otp',
    BLOCK_USER: 'block-user',
    RESET_PASSWORD: 'forgot-password',
  },
  USER_MANAGEMENT: {
    GLOBAL_ROUTES: `${BASE_APIS_URL.SECURED}/user`,
    CREATE_USER: 'create-user',
  },
  PRODUCTS_MANAGEMENT: {
    GLOBAL_ROUTES: `${BASE_APIS_URL.SECURED}/products`,
    GET_ALL_PRODUCTS: 'get-products',
    UPDATE_PRODUCT: 'update-product',
    SOFT_DELETE_PRODUCT: 'soft-delete-product',
    RESTORE_PRODUCT: 'restore-product',
    TRASH_LIST: 'trash-list',
    DELETE_PRODUCT: 'delete-product',
    NEW_PRODUCT: 'add-product',
  },
  CATEGORIES: {
    GLOBAL_ROUTES: `${BASE_APIS_URL.SECURED}/categories`,
    ADD: 'create-category',
  },
};
