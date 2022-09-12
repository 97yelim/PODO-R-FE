import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from "react-query"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const postComment = async(comment) => {
    const {data} = await axios.post('http://localhost:3001/comments', comment)
    return data
  }

const ReviewCreateForm = () => {
    const { postId } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const black_pattern = /^\s+|\s+$/g;
    const isBlank = (value) => (
        value.replace(black_pattern, '') === "" ? false : true
    )

    const queryClient = useQueryClient()
    const { mutate } = useMutation(postComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
        }
    })

    const onSubmit = (data) => {
        const new_comment = {
            commentId: parseInt(postId),
            author: "지킬킬",
            content: data.comment
        }
        mutate(new_comment)

        toast.success("댓글이 등록되었습니다", {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT
        })
   
        reset({ comment: " " })
    }



    return (
        <>
            <ToastContainer/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <StDiv>
                    <div>
                        <StInput
                            type="text" 
                            placeholder='댓글을 입력하세요'
                            {...register("comment", { required: true, validate: value => isBlank(value) })}
                        />
                        {errors.comment && errors.comment.type === "required" && <p>댓글 내용을 입력해 주세요~</p>}
                        {errors.comment && errors.comment.type === "validate" && <p>공백만 입력되었어요!</p>}
                    </div>
                    <StButton>등록하기</StButton>
                </StDiv>
            </form>
        </>
    );
};

const StDiv = styled.div`
    display: flex;
    align-items: flex-start;
    div {
        display: flex;
        flex-direction: column;
        p {
            text-align: left;
            color: red;
            margin-top: 10px;
            font-size: 14px;
        }
    }
`

const StInput = styled.input`
    width: 467px;
    height: 37px;
    background-color: #eee;
    margin-right: 4px;
`

const StButton = styled.button`
    width: 69px;
    font-size: 12px;
    border-radius: 10px;
    height: 36px;
    border: 1px solid var(--gray-2);
    background: none;
    cursor: pointer;
    color: var(--gray-2);
`

export default ReviewCreateForm;