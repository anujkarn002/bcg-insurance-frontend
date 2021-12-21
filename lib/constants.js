export const __prod__ = process.env.NODE_ENV === "production";
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
export const isStaging = process.env.NEXT_PUBLIC_IS_STAGING === "true";