
import { Route, Routes } from "react-router-dom";


import { ErrorPage } from "./ErrorPage";
import { Root } from "./Root";
import { Suspense, type ReactNode } from "react";
import { Spinner } from "../components/atoms/Loading";
import Categories from "../pages/categories";
import Login from "../components/Auth/Login";
import SupCategories from "../pages/supcategories";
import Products from "../pages/products";

interface SuspenseWrapperProps {
    children: ReactNode;
}
const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => (
    <Suspense fallback={<Spinner />}>{children}</Suspense>
);
export const AllRoutesProvider = () => {


    return (
        <Routes>
 <Route
                    index
                    element={
                        <Login/>
                    }
                />
            <Route path="/dashboard" element={<Root />} errorElement={<ErrorPage />}>
                <Route path="*" element={<ErrorPage />} />
               
                <Route
                    path="/dashboard/categories"
                    element={
                        <SuspenseWrapper>
                            <Categories title={("categories")} />
                        </SuspenseWrapper>
                    }
                />
                <Route
                    path="/dashboard/sup-categories"
                    element={
                        <SuspenseWrapper>
                            <SupCategories title={("sup categories")} />
                        </SuspenseWrapper>
                    }
                />
                <Route
                    path="/dashboard/products"
                    element={
                        <SuspenseWrapper>
                            <Products title={("products")} />
                        </SuspenseWrapper>
                    }
                />
                
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    );
};