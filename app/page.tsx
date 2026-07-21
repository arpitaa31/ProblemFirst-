import { Suspense } from "react";
import HomeExperience from "@/components/home-experience";

export default function Home() {
  return (
    <Suspense>
      <HomeExperience />
    </Suspense>
  );
}
