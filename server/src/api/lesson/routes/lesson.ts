import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::lesson.lesson", {
  config: {
    update: {
      policies: [{ name: "global::ownership", config: { type: "lesson" } }],
    },
    delete: {
      policies: [{ name: "global::ownership", config: { type: "lesson" } }],
    },
  },
});
