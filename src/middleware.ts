import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // change here after testing
  publicRoutes: ["/", "/contact", "/api/webhooks/clerk", "/api/contact"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
