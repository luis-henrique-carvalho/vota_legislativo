import { APP_ROUTES } from "@/routes/app.routes";

/**
 *
 * @param asPath string
 * @return
 */

export const checkIsPublicRoute = (asPath: string) => {
  const appPublicRoutes = Object.values(APP_ROUTES.public);

  return appPublicRoutes.includes(asPath);
};
