import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const Alerts = {
  SUCCESS: (text: string) =>
    Toast.fire({
      icon: "success",
      title: text,
    }),
  ERROR: (text: string) =>
    Toast.fire({
      icon: "error",
      title: text,
    }),
  WARNING: (text: string) =>
    Toast.fire({
      icon: "warning",
      title: text,
    }),
  DELETE: (text: string) =>
    Swal.fire({
      title: text,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "DELETAR",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        return result.isConfirmed;
      }
    }),
};
