import Cookies from "js-cookie";
import adminApi from "../../api/adminAxios";
import router from "../../router";
// state
export const state = {
    token: Cookies.get("token") || null,
    permissions: localStorage.getItem("permissions")? JSON.parse(localStorage.getItem("permissions")): [] || [],
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): []  || {},
}

// getters
export const getters = {
    token: state => state.token,
    permissions: state => state.permissions,
    user: state => state.user,
}

// mutations
export const mutations = {
    editToken(state,token){
        state.token = token;
        Cookies.set('token',token,{ expires: 7 });
    },
    editPermission(state,permissions){
        let name = [];
        permissions.forEach(el => {
            name.push(el.name);
        });
        state.permissions = name;
        localStorage.setItem('permissions',JSON.stringify(name));
    },
    logoutToken(state){
        state.token = null;
        state.user = {};
        state.permissions = [];
        Cookies.remove('token');
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
    },
    editUser(state,user){
        state.user = user;
        localStorage.setItem('user',JSON.stringify(user));
    },
};

// actions
export const actions = {
    async checkAuth({ dispatch, commit }){
        await adminApi.post('/profile')
            .then((res) => {
                let l = res.data.data;

                commit("editUser", l.user);
                commit("editPermission", l.user.permissions);
            })
            .catch((err) => {
                commit('logoutToken');
                if(location.pathname != "/login"){
                    router.push({name: 'login'});
                }
            })
    }
};
