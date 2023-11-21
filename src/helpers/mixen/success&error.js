import Swal from "sweetalert2";
export default {
    methods: {
        errorFun(Error,text) {
            Swal.fire({
                icon: "error",
                title: `${Error}`,
                text: `${text}`,
            });
        },
        successFun(text,title = null) {
            if(title){
                Swal.fire({
                    icon: "success",
                    title: `${title}`,
                    text: `${text}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }else {
                Swal.fire({
                    icon: "success",
                    text: `${text}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    }
}

