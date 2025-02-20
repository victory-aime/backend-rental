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
    NEW_PRODUCT: 'add-product',
  },
};
