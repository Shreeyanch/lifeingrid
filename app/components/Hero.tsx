import LeftScrapbookCluster from './LeftScrapbookCluster'
import RightScrapbookCluster from './RightScrapbookCluster'
import HeroCenterText from './HeroCenterText'
import HeroMobile from './HeroMobile'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F1EC] overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block">
        <LeftScrapbookCluster />
        <HeroCenterText />
        <RightScrapbookCluster />
      </div>
      {/* Mobile */}
      <div className="block md:hidden">
        <HeroMobile />
      </div>
    </section>
  )
}
