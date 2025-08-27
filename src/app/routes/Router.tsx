import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Flats = lazy(() => import("./pages/Flats"));

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Flats />} />
		</Routes>
	)
}