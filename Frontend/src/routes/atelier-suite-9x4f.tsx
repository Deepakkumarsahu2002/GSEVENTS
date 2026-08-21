import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/atelier-suite-9x4f")({
  head: () => ({
    meta: [
      { title: "Studio" },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Studio" },
      { property: "og:description", content: "Private studio area." },
    ],
  }),
  component: () => <Outlet />,
});
