import React from 'react'
import axios from 'axios';

export default function CommentBtn({ snippetId }) {

    const [text, setText] = React.useState("")
    const [commentList, setCommentList] = React.useState([])

    const addComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            const res = await axios.post(`http://localhost:8001/api/v1/snippet/${snippetId}/comments`, { text })
            console.log('Comment added:', res.data);

            // Handle different response formats
            const newComment = res.data.comment || res.data.data || res.data;
            setCommentList([...commentList, newComment]);
            setText("")
        }
        catch (error) {
            console.error('Error adding comment:', error);
        }
    }



    return (
        <div>
            <form onSubmit={addComment}>
                <div className="w-full flex items-center gap-2 mt-5">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder="Write a comment..."
                        className="border p-2 rounded w-full h-5"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 pb-0.5 rounded hover:bg-blue-700 h-5">
                        Comment
                    </button>

                </div>
            </form>
            <div>
                {commentList.map((comment, index) => (
                    <div key={index} className="border p-2 rounded mt-2 flex justify-between items-center">
                        <span>{String(comment.text || comment.comment || '')}</span>

                    </div>
                ))}
            </div>
        </div>
    )
}
