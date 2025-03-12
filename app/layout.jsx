import "@styles/globals.css"
import Nav from "@components/Nav"
import Provider from "@components/Provider"

export const metadata = {
    title: "SaaSify",
    description: "Discover&Share SaaS ideas",
  };


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <div className="top-line"/>
                <Nav/>
                <main className="app min-h-[70vh]">
                    {children}
                </main>
                <div className="bottom-line"/>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout