export default function Layout({ 
    children 
} : { 
    children: React.ReactNode 
}) {
    return (
        <main className="h-screen w-screen flex flex-col items-center justify-center"> 
            { children }
        </main>
    )
}