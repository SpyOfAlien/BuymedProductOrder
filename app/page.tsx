import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Product Search & Order</h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>
      </main>
    </div>
  );
}
