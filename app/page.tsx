import { Footer } from "./components/footer";
import { Header } from "./components/header";

export default function Home() {
   return (
      <div className="min-h-screen p-8 pb-2">
         <Header />
         <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1 className="text-4xl font-bold">Next.js</h1>
            <h2 className="text-2xl">The React Framework</h2>
         </main>

         <Footer />
      </div>
   );
}
