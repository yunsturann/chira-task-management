import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // change here after testing
  publicRoutes: ["/", "/api/webhooks/clerk", "/api/todo(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
