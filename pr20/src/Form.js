

export default function Form({ body, title, handleBody, handleTitle, newPost}) {
    return (
        <form>
            <label htmlFor='title'>Заголовок поста</label>
            <input id='title' value={title} onChange={handleTitle}></input>
            <label htmlFor='body'>Содержимое поста</label>
            <input id='body' value={body} onChange={handleBody}></input>
            {newPost != null ? (
                <button onClick={newPost} type="button">Создать пост</button>) : (<></>)}
        </form>
    )
}