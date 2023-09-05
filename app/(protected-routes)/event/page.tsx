import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

export default async function Page() {
    const session = await getServerSession(options)

    return (
        <h1 className='p-8'>Events of {
            session!.user!.name
                ? session!.user!.name
                : session!.user!.email
        }
        </h1>
    )
}
