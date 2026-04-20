"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import React, { useActionState } from 'react'
import * as actions from "@/actions"
import { ArrowLeft, Plus, Type, Code2, AlertCircle } from 'lucide-react'

const CreateSnippetPage = () => {
  const [formUseData, action] = useActionState(actions.createSnippet, { message: "" })

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in">
      <Link href="/" className="group flex items-center gap-2 text-indigo-300/60 hover:text-indigo-300 transition-colors">
        <div className="p-2 rounded-xl glass group-hover:bg-indigo-500/10 border-white/5 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">Create New Snippet</h1>
        <p className="text-indigo-200/50">Store your reusable code blocks for future use.</p>
      </div>

      <form action={action} className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-indigo-200/70 flex items-center gap-2 ml-1">
              <Type className="w-4 h-4" /> Title
            </Label>
            <Input 
              type="text" 
              name="title" 
              id="title" 
              placeholder="e.g. React useLocalStorage Hook"
              className="bg-white/5 border-white/10 rounded-2xl h-12 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder:text-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code" className="text-indigo-200/70 flex items-center gap-2 ml-1">
              <Code2 className="w-4 h-4" /> Code Content
            </Label>
            <Textarea 
              name="code" 
              id="code" 
              placeholder="Paste your code here..."
              className="bg-white/5 border-white/10 rounded-2xl min-h-[200px] focus:ring-indigo-500/50 focus:border-indigo-500/50 text-indigo-50 font-mono placeholder:text-white/20"
            />
          </div>
        </div>

        {formUseData.message && (
          <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-200 text-sm animate-in'>
            <AlertCircle className="w-5 h-5 text-red-400" />
            {formUseData.message}
          </div>
        )}

        <Button type="submit" className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] gap-3">
          <Plus className="w-5 h-5" />
          Create Snippet
        </Button>
      </form>
    </div>
  )
}

export default CreateSnippetPage
