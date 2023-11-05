import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
    const isAuthenticated = false;
    return (
        <>
            {isAuthenticated ? (
                <Navigate to='/' />
            ) : (
                <>
                    <main className='flex h-screen bg-dark-1'>

                        <section className='flex flex-1 justify-center items-center flex-col py-10'>
                            <Outlet />
                        </section>
                        <img
                            src='/src/assets/side-img.svg'
                            alt='logo'
                            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
                        />
                    </main>
                </>
            )}
        </>
    )
}

export default AuthLayout;