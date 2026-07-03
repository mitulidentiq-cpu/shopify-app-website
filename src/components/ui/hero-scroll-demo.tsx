import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import scrollImg from "@/images/scrollanimation image.png";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-black pb-20 pt-0">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex px-4 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-xs uppercase tracking-widest font-semibold">
              Platform Analytics
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
              Track your revenue growth in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 font-black">
                Real-Time
              </span>
            </h1>
            
          </div>
        }
      >
        <img
          src={scrollImg}
          alt="Bundlify App Merchant Dashboard"
          className="mx-auto rounded-2xl object-cover h-full w-full object-top shadow-[0_0_80px_20px_rgba(255,255,255,0.08)]"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
