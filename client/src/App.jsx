import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux"
import {
  Home,
  Auth,
  Orders,
  Tables,
  Menu,
  Dashboard } from "./pages"
import Header from "./components/shared/Header"
import useLoadData from "./hooks/useLoadData"
import FullScreenLoader from "./components/shared/FullScreenLoader"

function Layout() {
  const location = useLocation()
  const isLoading = useLoadData()
  const hideHeaderRoutes = ["/auth"]
  const { isAuth } = useSelector((state) => state.user)

  if (isLoading) return <FullScreenLoader />
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector((state) => state.user)
  if (!isAuth) {
    return <Navigate to="/auth" />
  }

  return children
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App