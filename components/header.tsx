import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import LoginButton from "./login-button"
import { UserInfo } from '../types/user'

export default async function Header() {
    const session = await getServerSession(options)
    const user = session?.user as UserInfo | undefined

    return (
        <header className='flex justify-end p-4 gap-4 items-center'>
            {session
                ? <>
                    <p>{user?.username}</p>
                    <LoginButton role='signout'>Log out</LoginButton>
                </>
                : <LoginButton role='signin'>Log in</LoginButton>
            }
        </header>
    )
}
