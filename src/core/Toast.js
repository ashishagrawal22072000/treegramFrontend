import { toast } from "react-toastify";
export default function Notify(type, message) {
  const toastConfigure = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "colored",
  };
  switch (type) {
    case "success":
      return toast.success(message, toastConfigure);
    case "warning":
      return toast.warning(message, toastConfigure);
    case "error":
      return toast.error(message, toastConfigure);
    default:
      return null;
  }
}
