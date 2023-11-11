import {
  RouterProvider,
  Route,
  Router,
  RootRoute,
} from '@tanstack/react-router'

// Import route components
import Root from "./routes/root"
import Index from "./routes/index"
import Test from "./routes/test"

// Create routes
const rootRoute = new RootRoute({
  component: Root,
})

const indexRoute = new Route({
  path: "/",
  getParentRoute: () => rootRoute,
  component: Index,
})

const testRoute = new Route({
  path: "/test",
  getParentRoute: () => rootRoute,
  component: Test
})

// Create the route tree using routes
const routeTree = rootRoute.addChildren([indexRoute, testRoute])

// Create the router using route tree
const router = new Router({ routeTree })

// Register router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Export app component with router provider
export default function App() {
  return <RouterProvider router={router} />
}