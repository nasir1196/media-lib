import { Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import FlexBetween from 'components/FlexBetween/FlexBetween';
import { setPost } from 'state';


const Comment = ( {
    postId,
    userId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments, } ) =>
{
    const dispatch = useDispatch();
    const [ isComment, setIsComment ] = useState( [ 1, 2, 3, 4 ] );
    const [ comment, setComment ] = useState( " " );
    const token = useSelector( ( state ) => state.token );

    const handleClick = async () =>
    {
        try
        {
            const response = await fetch( `http://localhost:5000/posts/${ postId }/comments`, {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }`, "Content-Type": "application/json" },
                body: JSON.stringify( { userId: userId, comments: comment } )

            } );

            const updatePost = await response.json();
            dispatch( setPost( { post: updatePost } ) );
            setComment( " " );
        } catch ( err )
        {
            console.log( err );

        }
    };
    return (
        <Box>
            <Box>
                <Box>
                    <Typography variant="h6" gutterBottom>Comments</Typography>
                    {
                        isComment.map( ( c, i ) => (
                            <Typography key={ i } gutterBottom variant="subtitle1">
                                comment { i }
                            </Typography>
                        ) )
                    }
                </Box>
                <Box sx={ { width: "70%" } }>
                    <Typography variant="h6" gutterBottom>Write a Comments</Typography>

                    <TextField
                        fullWidth
                        rows={ 4 }
                        label="Comment"
                        multiline
                        value={ comment }
                        onChange={ ( e ) => setComment( e.target.value ) }
                    />
                    <Button sx={ { marginTop: "10px" } } fullWidth disabled={ !comment } variant="contained" color="primary" onClick={ handleClick }>
                        Comment
                    </Button>

                </Box>
            </Box>
        </Box>
    );
};

export default Comment;