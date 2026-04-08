import { BrowserRouter, Route, Routes } from 'react-router';
import AppLayout from '../Layout/AppLayout';
import Home from '../Pages/Home';
import Liked from '../Pages/Liked';
import Login from '../Pages/Login';
import MyPosts from '../Pages/MyPosts';
import NewPost from '../Pages/NewPost';
import Profile from '../Pages/Profile';
import Register from '../Pages/Register';
import SearchUsers from '../Pages/SearchUsers';
import UserDetails from '../Pages/UserDetails';
import PostDetails from '../Pages/PostDetails';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/meu-perfil" element={<Profile />} />
            <Route path="/meu-perfil/posts" element={<MyPosts />} />
            <Route path="/meu-perfil/curtidos" element={<Liked />} />
            <Route path="/criar-post" element={<NewPost />} />
            <Route path="/buscar" element={<SearchUsers />} />
            <Route path="/buscar/usuario/:id" element={<UserDetails />} />
            <Route path="/buscar/usuario/post/:id" element={<PostDetails />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
