import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Navbar from './Components/navbar';
import AboutPage from './Pages/LoggedInPages/AboutPage';
import ChatsGroupsPage from './Pages/LoggedInPages/ChatsGroupsPage';
import DeleteAccountPage from './Pages/LoggedInPages/DeleteAccountPage';
import EditGroup from './Pages/LoggedInPages/EditGroup';
import EditProfilePage from './Pages/LoggedInPages/EditProfilePage';
import FriendsPage from './Pages/LoggedInPages/Friends';
import HomePage from './Pages/LoggedInPages/HomePage';
import NewChatPage from './Pages/LoggedInPages/NewChatPage';
import NewGroup from './Pages/LoggedInPages/NewGroup';
import NewPostPage from './Pages/LoggedInPages/NewPostPage';
import PostPage from './Pages/LoggedInPages/PostPage';
import PostsPage from './Pages/LoggedInPages/PostsPage';
import SearchPage from './Pages/LoggedInPages/SearchPage';
import Settings from './Pages/LoggedInPages/SettingsPage';
import SetUpPage from './Pages/LoggedInPages/SetUpPage';
import UserProfile from './Pages/LoggedInPages/UserProfile';
import IntroPage from "./Pages/NewUserPages/Intropage";
import LoginPage from "./Pages/NewUserPages/LoginPage";
import SignUpPage from "./Pages/NewUserPages/SignUpPage";
import PageError from './Pages/ErrorPages/PageError';
import './App.css';
import Loading from "./Components/Loading";
import PropTypes from 'prop-types';
import SearchedUserProfile from "./Pages/LoggedInPages/SearchedUserProfile";
import GroupChat from "./Pages/LoggedInPages/GroupChat";
import GroupsList from "./Components/GroupsList";
import Notification from './Pages/LoggedInPages/Notification';
//in here i will just not allow any users that are offline to use this to prevent error

const ProtectedRoute = ({ children }) => {
    ProtectedRoute.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }
    if (!isAuthenticated) {
        return <Navigate to="/LoginPage" replace />;
    }
    return children;
};

const AppContent = () => {
    const { user, isAuthenticated, loading } = useContext(AuthContext);
    const [initialLoading, setInitialLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (!loading) {
            setInitialLoading(false);
        }
    }, [loading]);

    if (initialLoading) return <Loading />;

    const showNavbar = ["/", "/PostsPage", "/ChatsGroupsPage", "/Friends", "/UserProfile"].includes(location.pathname);

    return (
        <div style={{
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <Routes>
                <Route path="/" element={isAuthenticated ? <HomePage /> : <IntroPage />} />
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/SignUpPage" element={<SignUpPage />} />
                <Route path="/AboutPage" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
                <Route path="/ChatsGroupsPage" element={<ProtectedRoute><ChatsGroupsPage /></ProtectedRoute>} />
                <Route path="/DeleteAccountPage" element={<ProtectedRoute><DeleteAccountPage /></ProtectedRoute>} />
                <Route path="/EditProfilePage" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
                <Route path="/Friends" element={<ProtectedRoute><FriendsPage /></ProtectedRoute>} />
                <Route path="/NewChatPage" element={<ProtectedRoute><NewChatPage /></ProtectedRoute>} />
                <Route path="/NewPostPage" element={<ProtectedRoute><NewPostPage /></ProtectedRoute>} />
                <Route path="/PostsPage" element={<ProtectedRoute><PostsPage /></ProtectedRoute>} />
                <Route path="/SearchPage" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                <Route path="/SettingsPage" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/SetUpPage" element={<ProtectedRoute><SetUpPage /></ProtectedRoute>} />
                <Route path="/EditGroup" element={<ProtectedRoute><EditGroup /></ProtectedRoute>} />
                <Route path="/NewGroup" element={<ProtectedRoute><NewGroup /></ProtectedRoute>} />
                <Route path="/UserProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/PostPage/:postId" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
                <Route path="/SearchedUserProfile/:userId" element={<ProtectedRoute><SearchedUserProfile /></ProtectedRoute>} />
                <Route path="/groups" element={<ProtectedRoute><GroupsList /> </ProtectedRoute>} />
                <Route path="/groups/new" element={<ProtectedRoute><NewGroup /> </ProtectedRoute>} />
                <Route path="/groups/:groupId" element={<ProtectedRoute><GroupChat /> </ProtectedRoute>} />
                <Route path="/groups/:groupId/edit" element={<ProtectedRoute><EditGroup /> </ProtectedRoute>} />
                <Router path="/Notification" element={<ProtectedRoute><Notification /></ProtectedRoute> } />
                <Route path="*" element={<PageError />} />
            </Routes>
            {user && showNavbar && <Navbar />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;