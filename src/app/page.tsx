import Banner from "@/components/banner";
import StatsSection from "@/components/stats-section";
import RolesSection from "@/components/roles-section";
import FeaturesSection from "@/components/features-section";

export default function Home() {
  return (
    <div>
      <Banner />
      <StatsSection />
      <RolesSection />
      <FeaturesSection />
    </div>
  );
}
