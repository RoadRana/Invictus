import React from 'react';
import './Community.css';

const Community = () => {
    const [comments] = React.useState([
        { username: 'Alice', comment: 'This is my first post!', timestamp: '2024-09-08' },
        { username: 'Bob', comment: 'Loving this community!', timestamp: '2024-09-07' },
        { username: 'Charlie', comment: 'Anyone working on marine robotics?', timestamp: '2024-09-06' },
    ]);

    return (
        <div className="community-container mt-20">
            <h2 className="text-2xl font-semibold mb-4">Community Comments</h2>
            <div className="comments-section">
                {comments.map((comment, index) => (
                    <div key={index} className="comment-card">
                        <h4 className="comment-username">{comment.username}</h4>
                        <p className="comment-text">{comment.comment}</p>
                        <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
