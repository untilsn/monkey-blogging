import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/Auth-context";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./module/dashboard/DashBoardLayout";
import DashboardPage from "./pages/DashboardPage";
import PostDetailPage from "./module/post/PostDetailPage";
import PostManage from "./module/post/PostManage";
import PostAddNew from "./module/post/PostAddNew";
import CategoryAddnew from "./module/category/CategoryAddnew";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          {/* dashboard */}
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddnew></CategoryAddnew>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
