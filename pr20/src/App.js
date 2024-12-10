import axios from "axios"
import React, { useState } from "react"
import PostList from "./PostList"
import Form from "./Form"

export default function App() {
    const [posts, setPosts] = useState([])
    const [newForm, setNewForm] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [newFormName, setNewFormName] = useState('Добавить новый пост')

    async function get() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setPosts(response.data)

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

    function newPostOpen() {
        setNewForm(prevForm => !prevForm)
        if(!newForm) {
            setNewFormName('Свернуть форму')
        } else {
            setNewFormName('Добавить новый пост')
            setTitle('')
            setBody('')
        }
    }
    async function newPost(event, userId = 11) {
        event.preventDefault()
        try {
            axios.post('https://jsonplaceholder.typicode.com/posts', {
                "title": title,
                "body": body,
                "userId": userId
            })
            alert("Пост создан")
            newPostOpen()
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

    function handleTitle(event) {
        setTitle(event.target.value)
    }
    function handleBody(event) {
        setBody(event.target.value)
    }
    
    function delPost(postID) {
        console.log(postID)
        if(window.confirm("Вы уверены, что хотите удалить пост?")) {
            let updPost = [...posts]
            const index = updPost.findIndex(post => post.id === postID)
            if(index !== -1) {
                updPost.splice(index, 1)
                setPosts(updPost)
            }
            console.log(updPost)
            console.log(posts)
            setPosts(updPost)
            del(postID)
        } else {
            alert("Ну ладно")
        }
        console.log(posts)
    }
    async function del(id) {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            alert('Удалено')
        } catch(error) {
            console.error('Ошибка в удалении поста', error)
        }
    }

    return (
        <>
            <button onClick={newPostOpen}>{newFormName}</button>
            {newForm ? (
                <Form body={body} title={title} handleBody={handleBody} handleTitle={handleTitle} newPost={newPost}></Form>
            ) : (<></>)}
            <button onClick={get}>Загрузить посты</button>
            <PostList posts={posts} delPost={delPost}></PostList>
        </>
    )
}