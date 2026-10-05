const AuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-screen bg-red-500">
            <div
                className="w-full h-16 bg-blue-100 flex items-center justify-center text-black font-bold text-3xl"
            >
                AUTHORIZED LAYOUT
            </div>
            {children}
        </div>
    )
}

export default AuthorizedLayout;
