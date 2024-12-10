import React, { useState } from "react"
import axios from "axios"
import Form from "./Form"

export default function Post({ post, delPost }) {
    const [more, setMore] = useState(false)
    const [moreDate, setDate] = useState([])
    const [btnNameMore, setNameMore] = useState('Подробнее')
    const [red, setRed] = useState(false)
    const [btnNameRed, setNameRed] = useState('Редактировать')
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)

    async function moreF() {
        setMore(prevMore => !prevMore)
        if(!more) {
            try {
                setNameMore("Свернуть")
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
                setDate(response.data)
            } catch(error) {
                if(error.response) {
                    console.error('Не успех')
                } else if(error.request) {
                    console.error('Ответа от сервера нет')
                } else {
                    console.error('Ошибка запроса.')
                }
            }
        } else {
            setNameMore("Подробнее")
        }
    }

    async function redact(postID) {
        setRed(prevState => !prevState)
        if(!red) {
            setNameRed("Прекратить редактировать")
        } else {
            setNameRed("Редактировать")
            try {
                axios.put(`https://jsonplaceholder.typicode.com/posts/${postID}`)
                alert("Пост обновлён")
            } catch(error) {
                if(error.response) {
                    console.error('Не успех')
                } else if(error.request) {
                    console.error('Ответа от сервера нет')
                } else {
                    console.error('Ошибка запроса.')
                }
            }
        }
    }

    function handleTitle(event) {
        setTitle(event.target.value)
    }
    function handleBody(event) {
        setBody(event.target.value)
    }

    if(!red) {
        return (
            <li id={post.id}>
                <h4 className="title">{title}</h4>
                <p className="body">{body}</p>
                {more ? (
                    <p>Пост написал пользователь с id {moreDate.userId}, а id поста - {moreDate.id}</p>
                ): (<></>)}
                <button onClick={moreF}>{btnNameMore}</button>
                <button onClick={() => {redact(post.id)}}>{btnNameRed}</button>
                <button onClick={() => {delPost(post.id)}}>Удалить</button>
            </li>
        )
    } else {
        return (
            <li>
                <Form title={title} body={body} handleBody={handleBody} handleTitle={handleTitle}></Form>
                <button onClick={() => {redact(post.id)}}>{btnNameRed}</button>
            </li>
        )
    }
}
