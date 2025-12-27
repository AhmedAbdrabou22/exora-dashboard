/////////// IMPORTS
///
import { Box, MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLayoutEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "./context/auth-and-perm/AuthProvider";

import { AllRoutesProvider } from "./routing/allRoutes";

///
const colorSchemeManager = localStorageColorSchemeManager({
	key: 'mantine-color-scheme',
});

const App = () => {
	// const isRTL = useIsRTL();
	// const { user } = useAuth();
	// const navigate = useNavigate();


	useLayoutEffect(() => {
		document.documentElement.dir = "rtl"
		document.documentElement.lang = "ar"
	}, []);


	// useEffect(() => {
	//   var manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
	//   fetch(manifestLink?.href)
	//     .then((response) => response.json())
	//     .then((manifest) => {
	//       var blob = new Blob([JSON.stringify(manifest)], {
	//         type: "application/json",
	//       });
	//       var newUrl = URL.createObjectURL(blob) + "?v=" + new Date().getTime();
	//       manifestLink.href = newUrl;
	//     });
	// }, []);


	// useEffect(() => {
	// 	const token = Cookies.get("token");
	// 	const tenantDatabase = Cookies.get("tenant_database");
	// 	const tenantId = Cookies.get("tenant_id");

	// 	if (!token || !tenantDatabase || !tenantId) {
	// 		Cookies.remove("token");
	// 		Cookies.remove("tenant_database");
	// 		Cookies.remove("tenant_id");
	// 		Cookies.remove("modules");

	// 		navigate("/login", { replace: true });
	// 	}
	// }, [navigate]);



	return (
		<>
			<MantineProvider
				colorSchemeManager={colorSchemeManager}


			// emotionCache={isRTL ? rtlCache : undefined}

			>
				<ModalsProvider>
					<Box pos="relative">

						<AllRoutesProvider />
						<ToastContainer />
						<ReactQueryDevtools
							initialIsOpen={false}
						// position={"bottom-right"}
						/>


					</Box>
				</ModalsProvider>
			</MantineProvider>
		</>
	);
};
export default App;