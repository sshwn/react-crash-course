import { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';


function PostList({isPosting, onStopPosting}) {    

    return (
        <>
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewPost                         
                        onCancel={onStopPosting}
                        />
                </Modal>
            )}
            <ul className={classes.posts}>
                
            </ul>
        </>
    )
}

export default PostList;