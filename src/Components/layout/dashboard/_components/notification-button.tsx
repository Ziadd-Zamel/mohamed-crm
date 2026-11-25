import { IoIosNotificationsOutline } from "react-icons/io";
import { Button } from "@/Components/UI/button";

export default function NotificationButton() {
  return (
    <Button variant="gotht" size="icon-md" className="relative rounded-lg">
      <IoIosNotificationsOutline size={20} />
      <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-error px-1 text-xs leading-none font-medium text-white">
        0
      </span>
    </Button>
  );
}
