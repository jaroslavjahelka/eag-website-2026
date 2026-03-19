import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("story", "routes/story.tsx"),
  route("team", "routes/team.tsx"),
  route("media", "routes/media.tsx"),
  route("projects", "routes/projects.tsx"),
] satisfies RouteConfig;
