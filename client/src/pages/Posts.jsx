import React, { useEffect, useState } from "react";

const RenderPost = ({ data }) => {
  if (data?.length > 0) {
    return data.map((post) => <div key={post._id}>{post.content}</div>);
  }
};

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section>
      <div>
        <h1>Community Posts</h1>
        <p>Browse through the community posts!</p>
      </div>
      <div>
        <RenderPost data={allPosts} />
      </div>
    </section>
  );
}