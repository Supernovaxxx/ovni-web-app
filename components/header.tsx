import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import LogButton from "./log-button"
import { UserInfo } from '../types/user'

export default async function Header() {
    const session = await getServerSession(options)
    const user = session?.user as UserInfo | undefined

    return (
        <header className='flex justify-end p-4 gap-4 items-center'>
            {session
                ? <>
                    <p>{user?.username}</p>
                    <LogButton role='signout'>Log out</LogButton>
                </>
                : <LogButton role='signin'>Log in</LogButton>
            }
        </header>
    )
}
