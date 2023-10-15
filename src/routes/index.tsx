import {RouteType} from "./config";
import {Route} from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import {ReactNode} from "react";
import appRoutes from "./appRoutes";

function generateRoute(routes: RouteType[]) {
    return (
        routes.map((route: RouteType, index: number) => {
            return (
                route.index ? (
                    <Route
                        key={index}
                        index
                        element={
                            <PageWrapper state={route.state}>
                                {route.element}
                            </PageWrapper>
                        }
                    />
                ) : (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <PageWrapper state={route.child ? undefined : route.state}>
                                {route.element}
                            </PageWrapper>
                        }
                    >
                        {route.child && (generateRoute(route.child))}
                    </Route>
                )
            );
        })
    );
}

export const routes: ReactNode = generateRoute(appRoutes);