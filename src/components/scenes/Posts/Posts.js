import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostItems from '../PostItems/PostItems';

const Posts = ( { userId, isProfile = false } ) =>
{
    const dispatch = useDispatch();
    const posts = useSelector( ( state ) => state.posts );
    const token = useSelector( ( state ) => state.token );



    const getPosts = async () =>
    {
        const response = await fetch( "http://localhost:5000/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${ token }` },
        } );
        const data = await response.json();
        dispatch( setPosts( { posts: data } ) );
    };

    useEffect( () =>
    {
        if ( !isProfile )
        {
            getPosts();
        }
    }, [] ); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Box>
            {
                posts?.map( ( items ) => (
                    <PostItems key={ items._id }
                        postId={ items._id }
                        userId={ userId }
                        name={ `${ items.firstName } ${ items.lastName }` }
                        description={ items.description }
                        location={ items.location }
                        picturePath={ items.picturePath }
                        userPicturePath={ items.userPicturePath }
                        likes={ items.likes }
                        comments={ items.comments }
                    />
                ) )
            }
        </Box>
    );
};

export default Posts;