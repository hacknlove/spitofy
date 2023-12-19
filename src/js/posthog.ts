import posthog from "posthog-js";

posthog.init(import.meta.env.PUBLIC_POST_HOG, {
  api_host: "https://eu.posthog.com",
});
