import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import LogButton from "./log-button"

export default async function Header() {
    const session = await getServerSession(options)

    return (
        <header className='flex justify-end p-4 gap-4 items-center'>
            {session
                ? <>
                    <p>{session!.user!.name || session!.user!.email}</p>
                    <LogButton role='signout'>Log out</LogButton>
                </>
                : <LogButton role='signin'>Log in</LogButton>
            }
        </header>
    )
}