import type { Core } from "@strapi/strapi";

export default async (policyContext: any, config: any, { strapi }: { strapi: Core.Strapi }) => {
  const user = policyContext.state.user;

  if (!user) {
    return false;
  }

  const userRole = user.role.name;

  if (userRole === "Admin" || userRole === "Content-Manager") {
    return true;
  }

  if (userRole !== "Instructor") {
    return false;
  }

  const targetId = policyContext.params.id;

  if (!targetId) {
    return false;
  }

  const type = config?.type;

  if (type === "course") {
    const course = await strapi.db.query("api::course.course").findOne({
      where: { id: targetId },
      populate: ["instructor"],
    });

    if (!course || !course.instructor) {
      return false;
    }

    return course.instructor.id === user.id;
  } else if (type === "lesson") {
    const lesson = await strapi.db.query("api::lesson.lesson").findOne({
      where: { id: targetId },
      populate: { course: { populate: ["instructor"] } },
    });

    if (!lesson || !lesson.course || !lesson.course.instructor) {
      return false;
    }

    return lesson.course.instructor.id === user.id;
  }

  return false;
};
