import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

export default async function Page() {
    const session = await getServerSession(options)

    return (
        <div className="p-8 flex flex-col gap-2">
            <h1 className="text-lg font-bold">User info:</h1>
            <hr />
            <p>Name: {session!.user!.name}</p>
            <p>User email: {session!.user!.email}</p>
        </div>
    )
}
        