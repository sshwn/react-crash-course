import { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';


function PostList({isPosting, onStopPosting}) {    
    const [posts, setPosts] = useState([]);

    function addPostHandler(postData) {
//        setPosts([postData, ...posts]);
//  상태를 업데이트할 때 새로운 상태 값이 이전 상태값을 바탕으로 한것이라면 기존 posts를 이용해 새 상태를 정의했다.
//  이럴 때는 setPosts()에 함수를 넘겨줘야한다. 화살표 함수같은것 . 이 함수는 setPosts()를 호출할 때마다 react에 의해 자동 호출된다.
//  이 함수는 기본적으로 현재 상태의 스냅샷을 받는다  그걸 existingPost로 받고, 새로운 상태 값을 반환해야한다 아래처럼 
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
            <ul className={classes.posts}>
                {posts.map((post) => <Post author={post.author} body={post.body} />)}
            </ul>
        </>
    )
}

export default PostList;