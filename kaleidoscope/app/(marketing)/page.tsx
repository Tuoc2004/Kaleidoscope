import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w- [988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new languages with Kaleidoscope.
        </h1>
        <div>
        <Button size="lg" variant="secondary" className="w-full" asChild>
          <Link href="/learn">
          Continue Learning
          </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
