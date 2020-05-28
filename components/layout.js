import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, transparentHeader }) => {
  return (
    <div>
      <Header transparentHeader={transparentHeader} />
      <div>
        <main>{children}</main>
      </div>
			<Footer />
    </div>
  )
}

export default Layout
