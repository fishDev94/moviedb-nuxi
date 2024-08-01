import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to, from) => {

    if (to.query.logout) {
        console.log("here")
        Cookies.remove('user')

        return navigateTo("/");
    }
});