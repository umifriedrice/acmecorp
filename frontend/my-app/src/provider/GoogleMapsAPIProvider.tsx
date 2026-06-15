import type { ReactNode } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = "AIzaSyAEYGgUbofHO7IEnl_ttwEXzJPUdPs6CFE";

export default function GoogleMapsAPIProvider({ children }: Props) {
  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
}

interface Props {
  children: ReactNode;
}
