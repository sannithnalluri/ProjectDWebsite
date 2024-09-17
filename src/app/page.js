import { Suspense } from "react";
import Homepage_ProjectViewer from "./HomepageComponets/Homepage_ProjectViewer";
import Homepage from "./NewDesignHompage/Homepage";


export default function Home() {
  return (
    <Suspense  className="bg-primary-default">
      <Homepage/>
    </Suspense>
  );
}
