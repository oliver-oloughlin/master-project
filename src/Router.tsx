import { 
  Route, 
  RootRoute, 
  Router, 
  RouterProvider as Provider, 
  NotFoundRoute 
} from "@tanstack/react-router"

// Import route components
import Root from "./routes/root.route"
import NotFound from "./routes/404"
import Index from "./routes/index.route"
import Groups from "./routes/groups.route"
import Patients from "./routes/patients.route"

// Create routes
const rootRoute = new RootRoute({
  component: Root
})

const notFoundRoute = new NotFoundRoute({
  component: NotFound,
  getParentRoute: () => rootRoute
})

const indexRoute = new Route({
  path: "/",
  component: Index,
  getParentRoute: () => rootRoute
})

const groupsRoute = new Route({
  path: "/groups",
  component: Groups,
  getParentRoute: () => rootRoute
})

const patientsRoute = new Route({
  path: "/patients",
  component: Patients,
  getParentRoute: () => rootRoute
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  groupsRoute,
  patientsRoute,
])

// Create router
const router = new Router({ routeTree, notFoundRoute })

// Declare module
declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

// Export router provider
export default function RouterProvider() {
  return <Provider router={router} />
}
