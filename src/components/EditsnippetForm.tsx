"use client"
import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import type { Snippet } from '@prisma/client'
import { Button } from './ui/button'
import { saveSnippet } from '@/actions'
import { Save, Code2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const EditsnippetForm = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code);

  const changeEventhandler = (value: string | undefined) => {
    setCode(value || "")
  }

  const saveSnippetaction = saveSnippet.bind(null, snippet.id, code);
  
  return (
    <div className='flex flex-col gap-8 animate-in'>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href={`/snippet/${snippet.id}`} className="group flex items-center gap-2 text-indigo-300/60 hover:text-indigo-300 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Cancel edition</span>
          </Link>
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Code2 className="w-6 h-6 text-indigo-400" />
             </div>
             <h1 className='text-3xl font-bold text-white tracking-tight'>Editing: <span className="text-indigo-300">{snippet.title}</span></h1>
          </div>
        </div>

        <form action={saveSnippetaction}>
          <Button type='submit' className="h-12 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex gap-2 text-base font-semibold">
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </form>
      </div>

      <div className='relative group'>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative glass border-white/5 rounded-[2.5rem] overflow-hidden p-6">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-red-400/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
            <div className="w-3 h-3 rounded-full bg-green-400/50" />
            <span className="text-indigo-300/40 text-xs font-mono ml-2 uppercase tracking-widest">Monaco Editor v4</span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/5">
            <Editor
              height="60vh"
              theme='vs-dark'
              defaultLanguage="javascript"
              defaultValue={code}
              onChange={changeEventhandler}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                padding: { top: 20 },
                backgroundColor: 'transparent'
              } as any}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditsnippetForm
