import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata ={
    title: "prompt_nextjs",
    description:"prompt AI project."
}


const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div className="main">
                <div className="gradient">

                </div>
            </div>
            <main className="app">
                <Nav/>
                {children}
            </main>
            
        </body>
    </html>
  )
}

export default RootLayout