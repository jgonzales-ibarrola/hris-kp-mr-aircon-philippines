import { ReactNode } from "react";
import MainNav from "./_components/MainNav";

const Layout = async ({ children }: { children: ReactNode }) => {
	return (
		<>
			<MainNav />
			{children}
		</>
	);
};

export default Layout;
