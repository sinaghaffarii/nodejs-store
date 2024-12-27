const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                    type: string
 *                    description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -    mobile
 *                  -    code
 *              properties:
 *                  mobile:
 *                     type: string
 *                     description: the user mobile for signup/signin
 *                  code:
 *                     type: integer
 *                     description: recived code from GetOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refresh_token
 *              properties:
 *                  refresh_token:
 *                    type: string
 *                    description: enter refresh_token for get freshToken and refresh_token
 */

/**
 * @swagger
 * tags:
 *  name: User-Authentication
 *  description: user-auth section
 */

/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          summary: login user in userpanel with phone number
 *          tags: [User-Authentication]
 *          description: one time password(otp) login
 *          requestBody:
 *               required: true
 *               content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOTP"
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */

router.post("/get-otp", UserAuthController.getOtp);

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check otp value in user controller
 *          description: check otp with code mobile with expire date
 *          requestBody:
 *               required: true
 *               content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error 
 *
 */

router.post("/check-otp", UserAuthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *       post:
 *            tags: [User-Authentication]
 *            summary: send refresh token for get new token and refresh token
 *            description: fresh token
 *            requestBody:
 *               required: true
 *               content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/RefreshToken"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/RefreshToken"
 *            responses:
 *                200:
 *                    description: success
 */

router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
  UserAuthRoutes: router,
};
