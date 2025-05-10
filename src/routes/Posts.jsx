import PostList from '../components/PostList';
import { Outlet } from 'react-router-dom';
function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostList/>        
      </main>
    </>
  );  
}

export default Posts

export async function loader() {
  const response = await fetch('http://localhost:8080/posts')
  const resData = await response.json();      
  return resData.posts;
  // 화면에 표시할 데이터를 반환하면 그 데이터를 현재 라우트에 렌더링된 요소가 받는다
}