import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
export default function Notify(type, message) {
  Store.addNotification({
    title: "",
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__jackInTheBox"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 1000,
    },
  });
}
