// src/extensions/users-permissions/strapi-server.ts
export default (plugin: any) => {
  plugin.controllers.user.me = async (ctx: any) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }

    const user: any = await strapi.documents("plugin::users-permissions.user").findOne({
      documentId: ctx.state.user.documentId,
      populate: ["role"],
    });

    if (!user) {
      return ctx.notFound();
    }

    // Strapi-r built-in sanitizer 'role' relation-ke restricted dhore strip kore dey
    // (permission system-er limitation), tai manually sensitive field strip korchi
    const { password, resetPasswordToken, confirmationToken, ...sanitizedUser } = user;

    ctx.body = sanitizedUser;
  };

  return plugin;
};
