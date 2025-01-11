import { useSelectedLayoutSegments } from "next/navigation";

export default function useHidden() {
  const segment = useSelectedLayoutSegments();

  switch (segment[segment.length - 1]) {
    case "login":
    case "register":
      return false;
    default:
      return true;
  }
}
