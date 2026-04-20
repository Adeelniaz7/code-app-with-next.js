import EditsnippetForm from '@/components/EditsnippetForm'
import { prisma } from '@/lib/prisma';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const snippet = await prisma.snippet.findUnique({
        where: {
            id,
        }
    })

    if (!snippet) {
        return <div>Snippet not found</div>;
    }

    return <EditsnippetForm snippet={snippet} />

}

export default page
