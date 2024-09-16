import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import PostalModal from "./PostalModal";
import { getArticlesAPI, updateArticleAPI } from "../actions/index";

// Styled components
const Container = styled.div`
  grid-area: main;
`;

const CommonBox = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0, 0, 0 / 20%);
`;

const ShareBox = styled(CommonBox)`
  display: flex;
  flex-direction: column;
  margin: 0 0 8px;
  color: #958b7b;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
      }
    }
  }
`;

const Article = styled(CommonBox)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: #000;
        }
        &:nth-child(n + 2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    top: 0;
    right: 12px;
    border: none;
    outline: none;
    background: transparent;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  margin: 8px 16px 0;
  background-color: #f9fafb;
  img {
    width: 100%;
    height: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9efdf;
  color: rgba(0, 0, 0, 0.6);
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      color: rgba(0, 0, 0, 0.6);
      background: transparent;
      span {
        padding-left: 5px;
      }
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 12px;
  min-height: 40px;
  padding-bottom: 5px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    background: transparent;
    span {
      margin-left: 4px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }
  }
  button.active {
    span {
      color: #0a66c2;
      font-weight: 600;
    }
    svg {
      fill: #0a66c2;
    }
  }
`;

const CommentsSection = styled.div`
  padding: 0 16px;
  font-size: 14px;
  text-align: left;
  border-top: 1px solid #e9efdf;

  .comment {
    margin-bottom: 8px;
  }

  .comment-input {
    margin-top: 8px;
    display: flex;
    align-items: center;
    input {
      flex-grow: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    button {
      margin-left: 8px;
      padding: 8px 16px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

function Main() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState("close");
  const [user, setUser] = useState({ email: "mukulsh7496@gmail.com" }); // Default user state
  const [newCommentText, setNewCommentText] = useState(""); // State for new comment input
  const [commentInputs, setCommentInputs] = useState([]); // State for comment inputs for each post
  const [commentBoxVisible, setCommentBoxVisible] = useState({});

  useEffect(() => {
    // Fetch articles on component mount
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    setLoading(true);
    try {
      const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
      setArticles(storedArticles);
    } catch (error) {
      console.error("Error retrieving articles from local storage:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (payload) => {
    try {
      await updateArticleAPI(payload);
      // Refresh articles after successful update
      fetchArticles();
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleLike = (event, postIndex, id) => {
    event.preventDefault();

    // Clone the current articles state
    const updatedArticles = [...articles];
    let article = updatedArticles[postIndex];
    const userEmail = user.email;
    let whoLiked = article.likes?.whoLiked || [];
    let currentLikes = article.likes?.count || 0;

    // Check if user has already liked this post
    if (whoLiked.includes(userEmail)) {
      // User has already liked this post; remove like
      currentLikes--;
      whoLiked = whoLiked.filter(email => email !== userEmail);
    } else {
      // User has not liked this post; add like
      currentLikes++;
      whoLiked = [...whoLiked, userEmail];
    }

    // Update the article object with the new like count and list
    article = {
      ...article,
      likes: {
        count: currentLikes,
        whoLiked,
      },
    };

    // Update the articles state
    updatedArticles[postIndex] = article;
    setArticles(updatedArticles);

    // Update local storage
    try {
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error("Error updating local storage:", error);
    }

    // Prepare payload for API call
    const payload = {
      update: {
        likes: {
          count: currentLikes,
          whoLiked,
        },
      },
      id: id,
    };

    // Update article via API
    updateArticle(payload).catch(error => {
      console.error("Error updating article:", error);
      // Optionally, revert the state change in case of error
    });
  };

  const handleCommentInputChange = (postIndex, value) => {
    // Update the comment input state for the specific post
    setCommentInputs(prevInputs => {
      const newInputs = [...prevInputs];
      newInputs[postIndex] = value;
      return newInputs;
    });
  };

  const addComment = (postIndex) => {
    const commentText = commentInputs[postIndex];
    if (!commentText.trim()) return; // Avoid adding empty comments

    // Clone the current articles state
    const updatedArticles = [...articles];
    let article = updatedArticles[postIndex];

    // Create a new comment object
    const newComment = {
      text: commentText,
      date: new Date().toISOString(), // or another date format
      user: user.email, // Assuming user has an email
    };

    // Add the new comment to the article's comments array
    article.comments = article.comments || [];
    article.comments.push(newComment);

    // Update the article object in the state
    updatedArticles[postIndex] = article;
    setArticles(updatedArticles);

    // Update local storage
    try {
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error("Error updating local storage:", error);
    }

    // Prepare payload for API call
    const payload = {
      update: {
        comments: article.comments,
      },
      id: article.id,
    };

    // Update article via API
    updateArticle(payload).catch(error => {
      console.error("Error updating article:", error);
    });

    // Clear the comment input after adding the comment
    handleCommentInputChange(postIndex, "");
  };

  const clickHandler = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) return;
    setShowModal(prev => (prev === "open" ? "close" : "open"));
  };

  // Callback to refresh articles when a new post is added
  const handlePostCreation = () => {
    fetchArticles(); // Refresh articles after post creation
  };

  return (
    <Container>
      <ShareBox>
        <div>
          <img src="/images/avatar.png" alt="User" />
          <button onClick={clickHandler} disabled={loading}>
            Start a post
          </button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="Photo" />
            <span onClick={clickHandler} disabled={loading}>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="Video" />
            <span onClick={clickHandler} disabled={loading}>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="Event" />
            <span onClick={clickHandler} disabled={loading}>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="Write article" />
            <span onClick={clickHandler} disabled={loading}>Write article</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {loading ? (
          <img src="/images/spinner.svg" alt="Loading" />
        ) : (
          articles.map((article, key) => (
            <Article key={article.id}>
              <SharedActor>
  <a>
    <img src={article.actor?.image || "/images/avatar.png"} alt="Actor" />
    <div>
      <span>{article.actor?.displayName || "Mukul"}</span>
      <span>{article.actor?.description || "Associate Software Engineer"}</span>
      <span>{new Date(article.actor?.date).toLocaleDateString()}</span>
    </div>
  </a>
  <button>
    <img src="/images/ellipses.svg" alt="Options" />
  </button>
</SharedActor>
              <Description>{article.description}</Description>
              <SharedImage>
                <a>
                  {!article.sharedImg && article.video ? (
                    <ReactPlayer width="100%" url={article.video} />
                  ) : (
                    article.sharedImg && <img src={article.sharedImg} alt="Shared content" />
                  )}
                </a>
              </SharedImage>
              <SocialCount>
                {article.likes?.count > 0 && (
                  <>
                    <li>
                      <button>
                        <span>{article.likes?.count}</span>
                      </button>
                    </li>
                  </>
                )}
              </SocialCount>
              <SocialActions>
  <button
    onClick={(event) => handleLike(event, key, article.id)}
    className={article.likes?.whoLiked.includes(user.email) ? "active" : ""}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(0, 0, 0, 0.6)" width="24" height="24" focusable="false">
      <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
    </svg>
    <span>Like</span>
  </button>
  <button onClick={() => setCommentBoxVisible(prev => ({ ...prev, [key]: !prev[key] }))}>
    <img src="/images/comment-icon.svg" alt="Comment" />
    <span>Comment</span>
  </button>
  <button>
    <img src="/images/share-icon.svg" alt="Share" />
    <span>Share</span>
  </button>
  <button>
    <img src="/images/send-icon.svg" alt="Send" />
    <span>Send</span>
  </button>
</SocialActions>
<CommentsSection>
  {article.comments && article.comments.map((comment, idx) => (
    <div key={idx} className="comment">
      <strong>{comment.user}</strong>: {comment.text}
      <span> - {new Date(comment.date).toLocaleDateString()}</span>
    </div>
  ))}
  {commentBoxVisible[key] && (
    <div className="comment-input">
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentInputs[key] || ""}
        onChange={(e) => handleCommentInputChange(key, e.target.value)}
      />
      <button onClick={() => addComment(key)}>Comment</button>
    </div>
  )}
</CommentsSection>
            </Article>
          ))
        )}
      </Content>
      <PostalModal showModal={showModal} clickHandler={clickHandler} onPostCreation={handlePostCreation} />
    </Container>
  );
}

export default Main;
