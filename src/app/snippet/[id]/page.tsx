import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react'
import { deleteSnippet } from '@/actions';
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit3, Trash2, Code2, Copy } from 'lucide-react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = parseInt((await params).id);
    if (isNaN(id)) return (
        <div className="glass p-8 rounded-3xl text-center text-red-400 border-red-500/20">
            <h1 className="text-2xl font-bold">Invalid Snippet ID</h1>
        </div>
    );

    const snippet = await prisma.snippet.findUnique({
        where: {
            id,
        },
    });

    if (!snippet) notFound();

    const deleteSnippetactions = deleteSnippet.bind(null, snippet.id);

    return (
        <div className='flex flex-col gap-8 animate-in'>
            <div className="flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2 text-indigo-300/60 hover:text-indigo-300 transition-colors">
                    <div className="p-2 rounded-xl glass group-hover:bg-indigo-500/10 border-white/5 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Back to snippets</span>
                </Link>

                <div className='flex items-center gap-3'>
                    <Link href={`/snippet/${snippet.id}/edit`}>
                        <Button className="glass border-white/5 hover:bg-white/10 text-white gap-2 rounded-xl h-11 px-5">
                            <Edit3 className="w-4 h-4" />
                            Edit
                        </Button>
                    </Link>
                    <form action={deleteSnippetactions}>
                        <Button variant={"destructive"} type='submit' className="gap-2 rounded-xl h-11 px-5 shadow-lg shadow-red-500/10">
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </form>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-mono mb-1">
                            <Code2 className="w-4 h-4" />
                            <span>SNIPPET_CONTENT.raw</span>
                        </div>
                        <h1 className='font-bold text-4xl text-white tracking-tight'>{snippet.title}</h1>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-indigo-300/40 hover:text-indigo-300 hover:bg-indigo-500/10 gap-2">
                        <Copy className="w-4 h-4" />
                        Copy Code
                    </Button>
                </div>

                <div className='relative group'>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <pre className='relative glass border-white/5 rounded-3xl p-8 overflow-x-auto selection:bg-indigo-500/40'>
                        <code className="text-indigo-50 font-mono text-sm leading-relaxed">{snippet.code}</code>
                    </pre>
                </div>
            </div>
        </div>
    )
}

export default page

export const generateStaticParams = async () => {
    const snippets = await prisma.snippet.findMany();

    return snippets.map((snippet: any) => {
        return { id: snippet.id.toString() };
    });
}
