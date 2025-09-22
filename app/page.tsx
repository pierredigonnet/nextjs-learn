import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="font-sans py-2 flex items-center justify-center gap-10">
      <div className="h-fit">Learn Next</div>
      <ModeToggle />
    </div>
  );
}
