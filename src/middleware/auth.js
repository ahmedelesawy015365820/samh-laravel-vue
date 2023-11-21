import router from "../router/index";

export default function auth({ next, store }){
    if (!store.getters["auth/token"]) {
        return router.push({name: 'login'});
    } else {
        next();
    }
}
