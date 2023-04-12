import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import ProfileDetails from './ProfileDetails.';

const ProfileData = ( { userId, isProfile = false } ) =>
{
    const dispatch = useDispatch();
    const posts = useSelector( ( state ) => state.posts );
    const token = useSelector( ( state ) => state.token );




    const getUserPosts = async () =>
    {
        const response = await fetch(
            `http://localhost:5000/posts/${ userId }/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${ token }` },
            }
        );
        const data = await response.json();
        dispatch( setPosts( { posts: data } ) );
    };

    useEffect( () =>
    {
        if ( isProfile )
        {
            getUserPosts();
        }
    }, [] ); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Box>
            {
                posts?.map( ( items ) => (
                    <ProfileDetails
                        key={ items._id }
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

export default ProfileData;