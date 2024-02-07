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
import Groups from "./routes/group.$groupId.route"

// Create routes
export const rootRoute = new RootRoute({
  component: Root
})

export const notFoundRoute = new NotFoundRoute({
  component: NotFound,
  getParentRoute: () => rootRoute
})

export const indexRoute = new Route({
  path: "/",
  component: Index,
  getParentRoute: () => rootRoute
})

export const groupRoute = new Route({
  path: "/groups/$groupId",
  component: Groups,
  getParentRoute: () => rootRoute
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  groupRoute,
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
