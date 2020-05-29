import UserHeader from "./UserHeader"
import UserFooter from "./UserFooter"

const UserLayout = ({ children }) => {
  return (
    <div>
      <UserHeader />
      <div>
        <main>{children}</main>
      </div>
			<UserFooter />
    </div>
  )
}

export default UserLayout
