import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="flex flex-col items-center">
        <h1>The Future of SaaS <br/>Starts with
        <span className="text-main-2"> Your Idea</span></h1>
        <p className="subtitle">SaaSify is an open-source platform for the modern world to discover, create, and share innovative ideas.</p>
        <Feed/>
    </section>
  )
}

export default Home