const ImageUploader = require("../utils/ImageUploads3Bucket");
exports.editprofile = async (request, response, next) => {
  try {
    const { sub_type } = request.body;
    if (!sub_type) {
      throw errorHandler.createError(2031);
    }
    const isAgent = await isUserorAgent(request.email);
    if (isAgent === "A") {
      const agent = await Agent.findOne({
        where: {
          main_email: request.email,
        },
      });
      if (sub_type === "PROFILE") {
        agent
          .update({
            about: request.body.about,
            city_id: request.body.city_id,
            company_name: request.body.company_name,
            date_of_birth: request.body.date_of_birth,
            first_name: request.body.first_name,
            gender: request.body.gender,
            isd_code: request.body.isd_code,
            language: request.body.language,
            last_name: request.body.last_name,
            license: request.body.license,
            mobile: request.body.mobile,
            phone: request.body.phone,
            province_id: request.body.province_id,
            service_area: request.body.service_area,
            sub_type: request.body.sub_type,
            title: request.body.title,
            zip: request.body.zip,
          })
          .then((result) => {
            return apiResponder(request, response, next, true, 2030, {});
          })
          .catch((error) => {
            throw errorHandler.createError(2031);
          });
      }
      if (sub_type === "SOCIAL") {
        agent
          .update({
            facebook_link: request.body.facebook_link,
            instagram_link: request.body.instagram_link,
            linkedin_link: request.body.linkedin_link,
            twitter_link: request.body.twitter_link,
            website: request.body.website,
            youtube_link: request.body.youtube_link,
          })
          .then((result) => {
            return apiResponder(request, response, next, true, 2030, {});
          })
          .catch((error) => {
            throw errorHandler.createError(2031);
          });
      }
      if (sub_type === "PIMAGE") {
        await ImageUploader.uploadImage(request, "PROFILE").then((result) => {
          agent
            .update({
              image_url: result,
            })
            .then((result) => {
              return apiResponder(request, response, next, true, 2030, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2031);
            });
        });
      }
      if (sub_type === "CIMAGE") {
        await ImageUploader.uploadImage(request, "PROFILE").then((result) => {
          agent
            .update({
              cover_image_url: result,
            })
            .then((result) => {
              return apiResponder(request, response, next, true, 2030, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2031);
            });
        });
      }
    }
    if (isAgent === "U") {
      const User = await User.findOne({
        where: {
          email: request.email,
        },
      });
      if (sub_type === "PROFILE") {
        User.update({
          date_of_birth: request.body.date_of_birth,
          first_name: request.body.first_name,
          gender: request.body.gender,
          last_name: request.body.last_name,
          user_nickname: request.body.user_nickname,
        })
          .then((result) => {
            return apiResponder(request, response, next, true, 2030, {});
          })
          .catch((error) => {
            throw errorHandler.createError(2031);
          });
      }
      if (sub_type === "PIMAGE") {
        await ImageUploader.uploadImage(request, "PROFILE").then((result) => {
          User.update({
            image_url: result,
          })
            .then((result) => {
              return apiResponder(request, response, next, true, 2030, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2031);
            });
        });
      }
    }
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2031,
      {}
    );
  }
};
