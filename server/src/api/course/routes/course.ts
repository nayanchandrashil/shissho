import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::course.course", {
  config: {
    update: {
      policies: [{ name: "global::ownership", config: { type: "course" } }],
    },
    delete: {
      policies: [{ name: "global::ownership", config: { type: "course" } }],
    },
  },
});
