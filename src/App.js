import { Switch } from "react-router";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/rsuite/dist/styles/rsuite-default.css";
import "../src/styles/main.css";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ProfileProvider from "./context/profile.context";
import AdminHomePage from "./pages/admin";
import AuthorsControl from "./pages/admin/AuthorsControl";
import BookItemsControl from "./pages/admin/BookItemsControl";
import BooksControl from "./pages/admin/BooksControl";
import UsersControl from "./pages/admin/UsersControl";
import Authors from "./pages/authors";
import Books from "./pages/books";
import BookCopies from "./pages/books/bookCopies";
import Home from "./pages/home";
import Login from "./pages/Login";

function App() {
   return (
      <ProfileProvider>
         <Switch>
            <PrivateAdminRoute exact path="/admin">
               <AdminHomePage />
            </PrivateAdminRoute>
            <PrivateAdminRoute exact path="/admin/authors">
               <AuthorsControl />
            </PrivateAdminRoute>
            <PrivateAdminRoute exact path="/admin/books">
               <BooksControl />
            </PrivateAdminRoute>
            <PrivateAdminRoute exact path="/admin/bookItems">
               <BookItemsControl />
            </PrivateAdminRoute>
            <PrivateAdminRoute exact path="/admin/users">
               <UsersControl />
            </PrivateAdminRoute>
            <PrivateRoute exact path="/">
               <Home />
            </PrivateRoute>
            <PrivateRoute exact path="/books">
               <Books />
            </PrivateRoute>
            <PrivateRoute exact path="/authors">
               <Authors />
            </PrivateRoute>
            <PrivateRoute exact path="/copies/:isbn">
               <BookCopies />
            </PrivateRoute>
            <PublicRoute exact path="/login">
               <Login />
            </PublicRoute>
         </Switch>
      </ProfileProvider>
   );
}

export default App;
