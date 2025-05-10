import { useState, useEffect } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';


function PostList({isPosting, onStopPosting}) {    
    const [posts, setPosts] = useState([]);

    // useState와 달리 값을 반환하지 않는다.
    // 함수를 값으로 받는다 
    // 두번째 인자를 배열로 받는다
    // useEffect(() => {}, []);
    /*
        안에있는 효과함수가 컴포넌트 함수가 실행될때마다 함께 실행되지 않게 해줌으로써 
        무한 루프 발생을 막아준다. 
        가끔씩은 같이 동작함 (처음엔 데이터를 가져와야하니까) 
        두번째 인자로 결정된다. (배열)
        빈배열을 넣으면 이 함수에 의존성이 없다는 뜻이므로 컴포넌트가 처음 렌더링될때만 실행 
    */        

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('http://localhost:8080/posts')
            const resData = await response.json();        
            setPosts(resData.posts);
        };

        fetchPosts();
    }, []);

    function addPostHandler(postData) {
//        setPosts([postData, ...posts]);
//  상태를 업데이트할 때 새로운 상태 값이 이전 상태값을 바탕으로 한것이라면 기존 posts를 이용해 새 상태를 정의했다.
//  이럴 때는 setPosts()에 함수를 넘겨줘야한다. 화살표 함수같은것 . 이 함수는 setPosts()를 호출할 때마다 react에 의해 자동 호출된다.
//  이 함수는 기본적으로 현재 상태의 스냅샷을 받는다  그걸 existingPost로 받고, 새로운 상태 값을 반환해야한다 아래처럼 
        fetch('http://localhost:8080/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setPosts((existingPost) => [postData, ...existingPost]);
        // 이전 상태의 스냅샷을 바탕으로 상태를 갱신할 때는 이 방식이 더 좋다.
        // 리액트 내부에서 상태 갱신 함수를 곧바로 실행하는것이 아니기 때문에.
        console.log("test:::::" + postData);
    }

    return (
        <>
            {isPosting && (
                <Modal onClose={onStopPosting} >
                    <NewPost                         
                        onCancel={onStopPosting}
                        onAddPost={addPostHandler}
                        />
                </Modal>
            )}
            {posts.length > 0 && (
                <ul className={classes.posts}>            
                {posts.map((post) => <Post key={post.body} author={post.author} body={post.body} />)}
            </ul>
            )}
            {posts.length === 0 && 
            <div style={{textAlign: 'center', color: 'white'}}>
                <h2>There are no posts yet.</h2>
                <p>Start adding some!</p>
            </div>

            }
            
        </>
    )
}

export default PostList;