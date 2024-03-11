export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  if (!token.value) {
    if (to.path !== "/auth/login") {
      return navigateTo("/auth/login");
    }
  } else {
    if (to.path === "/auth/login") {
      return navigateTo("/");
    }
  }
});
