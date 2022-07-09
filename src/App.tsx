import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import 'main.scss';

const data = [
  {
    id: 2,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar1.png',
      username: 'Test User',
    },
  },
  {
    id: 1,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar2.png',
      username: 'Test User 2',
    },
  },
];

export default function App() {
  const [posts, setPosts] = useState(data);

  useEffect(() => {
    setPosts(data);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta
          name="description"
          content="Newsfeed of all your friends on
   Graphbook"
        />
      </Helmet>
      <h1>
        Hello Wforld
        {new Date().toString()}
      </h1>

      <div className="container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="header">
              <img src={post.user.avatar} alt="" />
              <h2>{post.user.username}</h2>
            </div>
            <p className="content">{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
