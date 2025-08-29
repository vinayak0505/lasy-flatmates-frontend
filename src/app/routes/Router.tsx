import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Flats = lazy(() => import("./pages/FlatsPage"));

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Flats />} />
		</Routes>
	)
}