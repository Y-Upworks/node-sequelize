const twilio = require("../Twilio/twilio");
const Domain = require("../../models/Domain");
const MailService = require("./NodeMailer");

exports.sendOtp = async (request, response, next) => {
  try {
    const {
      phone_no,
      account_id,
      account_type,
      expiry_date,
      type,
    } = request.body;
    if (!phone_no && !account_id && !account_type) {
      throw apiResponder.createError(2112);
    }

    let twilioResult = null;
    let result = null;

    if (type === "phone_no") {
      twilioResult = await twilio.sendOtp(phone_no);
    } else {
      //implement the sent otp on email logic
    }

    const codeAlreadyExist = await AccountOtp.findOne({
      where: {
        account_id: account_id,
        account_type: account_type,
      },
    });

    if (codeAlreadyExist) {
      result = await codeAlreadyExist.update({
        account_id: account_id,
        account_type: account_type,
        expiry_date: expiry_date,
        otp: twilioResult.otpCode,
      });
    } else {
      result = await AccountOtp.create({
        account_id: account_id,
        account_type: account_type,
        expiry_date: expiry_date,
        otp: twilioResult.otpCode,
      });
    }

    return apiResponder(request, response, next, true, 2111, result);
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2112,
      {}
    );
  }
};

exports.verifyOtp = async (request, response, next) => {
  try {
    const { account_id, account_type, send_date, type, otpCode } = request.body;

    if (!account_id && !account_type) {
      throw apiResponder.createError(2062);
    }

    if (type === "phone_no") {
      const otpVerifed = await AccountOtp.findOne({
        where: {
          account_id: account_id,
          account_type: account_type,
        },
      });
      console.log(otpVerifed.expiry_date - new Date(send_date));
      if (
        otpVerifed.expiry_date - new Date(send_date) > 900000 ||
        otpVerifed.expiry_date - new Date(send_date) < 0
      ) {
        return apiResponder(request, response, next, true, 2114, result); // check otp is expired or not
      } else {
        if (otpVerifed.otp === +otpCode) {
          if (account_type === "A") {
            let agent = await Agent.findOne({
              where: {
                id: account_id,
              },
            });
            agent.update({
              mobile_verified: 1,
            });
          } else {
            let user = await User.findOne({
              where: {
                id: account_id,
              },
            });
            user.update({
              mobile_verified: 1,
            });
          }
          return apiResponder(request, response, next, true, 2113, result);
        }
      }
    } else {
      // verify otp on email logic
    }
    return apiResponder(request, response, next, true, 2062, result);
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2062,
      {}
    );
  }
};

exports.verifyEmail = (request, response, next) => {
  try {
    decodedToken = jwt.verify(request.param.token, process.env.JWT_SECRET);
    return apiResponder(request, response, next, true, 2098, result);
  } catch (error) {
    return apiResponder(request, response, next, false, 2099, {});
  }
};
