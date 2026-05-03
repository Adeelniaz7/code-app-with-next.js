import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Code2, ChevronRight, Hash } from "lucide-react";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Snippet Master
          </h1>
          <p className="text-indigo-200/60 text-lg max-w-md">
            Your personal digital vault for code snippets. Secure, fast, and elegant.
          </p>
        </div>
        
        <Link href="/snippet/new">
          <Button className="h-12 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex gap-2 text-base">
            <Plus className="w-5 h-5" />
            Create Snippet
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.length === 0 && (
           <div className="col-span-full glass rounded-3xl p-12 text-center border-dashed border-2 border-indigo-500/20">
              <Code2 className="w-12 h-12 text-indigo-400/40 mx-auto mb-4" />
              <p className="text-indigo-200/40 text-lg">No snippets found. Start by creating one!</p>
           </div>
        )}
        
        {snippets.map((snippet: any) => (
          <Link key={snippet.id} href={`/snippet/${snippet.id}`} className="group">
            <div className="glass h-full p-6 rounded-3xl border border-white/5 group-hover:border-indigo-500/30 transition-all duration-300 hover:translate-y-[-4px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all">
                <Hash className="w-12 h-12 text-indigo-400" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {snippet.title}
                  </h2>
                  <div className="bg-indigo-500/10 text-indigo-300 text-xs font-mono px-3 py-1 rounded-full w-fit">
                    snippet #{snippet.id}
                  </div>
                </div>

                <div className="flex items-center text-indigo-300/80 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View Snippet <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
