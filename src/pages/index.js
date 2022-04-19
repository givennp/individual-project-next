import { useState, useEffect } from "react";
import ContentCard from "../components/ContentCard";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axiosInstance from "../configs/api";


const HomePage = () => {
  const [contentList, setContentList] = useState([]);
  const userSelector = useSelector((state) => state.auth);
  // const [isLoading, setIsLoading] = useState("")

  const fetchContentList = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          _sortBy: "id",
          _sortDir: "DESC",
        },
      });
      setContentList(res.data.result.rows);
      console.log(res.data.result.rows);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const addLikeButton = async (postId, idx) => {
    try {
      await axiosInstance.post(`/posts/${postId}/likes/${userSelector.id}`);

      const newLike = [...contentList];

      newLike[idx].like_count++;

      setContentList(newLike);

      // console.log(newLike);
    } catch (err) {
      console.log(err);
    }
  };

  const removeLikeButton = async (postId, userId, idx) => {
    try {
      const res = await axiosInstance.delete(
        `/posts/${postId}/likes/${userId}`
      );

      const newLike = [...contentList];

      newLike[idx].like_count--;

      setContentList(newLike);
      // console.log(newLike);
    } catch (err) {
      console.log(err);
    }
  };

  const renderContentList = () => {
    return contentList?.map((val, idx) => {
      let like_status;
      let isLiked = val?.post_like;

      if (isLiked?.length) {
        like_status = true;
      } else {
        like_status = false;
      }
      return (
        <ContentCard
          username={val.post_user?.username}
          caption={val.caption}
          imageUrl={val.image_url}
          location={val.location}
          numberOfLikes={val.like_count}
          comment_count={val.comment_count}
          dislike_count={val.dislike_count}
          id={val.id}
          profile_picture={val.avatar}
          addLikeButton={() => addLikeButton(val.id, idx)}
          removeLikeButton={() => removeLikeButton(val.id, val.user_id, idx)}
          userId={val.user_id}
          like_status={like_status}
          fetchContentList={fetchContentList}
          key={val?.id?.toString()}
        />
      );
    });
  };

  useEffect(() => {
    fetchContentList();
  }, []);

  return (
    <Box paddingY="8" left="0" right="0">
      {renderContentList()}
    </Box>
  );
};

export default HomePage;
