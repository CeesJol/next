import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <main>{children}</main>
      </div>
			<Footer />
    </div>
  )
}

export default Layout
