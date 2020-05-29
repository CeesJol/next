import React from "react"
import Link from "next/link"

const UserFooter = () => (
	<Link href="/">
		<footer className="userfooter">
			<h4><Link href="/"><a>Project name</a></Link></h4>
		</footer>
	</Link>
)

export default UserFooter
