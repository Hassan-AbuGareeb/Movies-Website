import "@/styles/globals.css"
import Layout from "./Layout"

export default function App({ Component, pageProps }) {
  return (
    // <Component {... pageProps} />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
