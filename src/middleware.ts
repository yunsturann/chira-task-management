import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // change here after testing
  publicRoutes: ["/", "/api/webhooks/clerk"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
