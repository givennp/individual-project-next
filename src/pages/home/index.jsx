// import { useState, useEffect } from "react";
// import ContentCard from "../../components/ContentCard";
// import { Box, Spinner } from "@chakra-ui/react";
// import axiosInstance from "../../configs/api";
// import { useSelector } from "react-redux";
// import InfiniteScroll from "react-infinite-scroll-component";

// const HomePage = () => {
//   const [contentList, setContentList] = useState([]);
//   const userSelector = useSelector((state) => state.auth);
//   const [page, setPage] = useState(1);
//   const [totalData, setTotalData] = useState(0);
//   // const [isLoading, setIsLoading] = useState("")

//   const maxPostPerPage = 3;

//   const fetchContentList = async () => {
//     try {
//       const res = await axiosInstance.get("/posts", {
//         params: {
//           _sortBy: "id",
//           _sortDir: "DESC",
//           _limit: maxPostPerPage,
//           _page: page,
//         },
//       });
//       setTotalData(res.data.result.count);
//       setContentList((prevPost) => [...prevPost, ...res.data.result.rows]);
//     } catch (err) {
//       console.log(err?.response?.data?.message);
//     }
//   };

//   const fetchNextPage = () => {
//     if (page < Math.ceil(totalData / maxPostPerPage)) {
//       setPage(page + 1);
//     }
//   };

//   const addLikeButton = async (postId, idx) => {
//     try {
//       await axiosInstance.post(`/posts/${postId}/likes/${userSelector.id}`);

//       const newLike = [...contentList];

//       newLike[idx].like_count++;

//       setContentList(newLike);

//       // console.log(newLike);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const removeLikeButton = async (postId, userId, idx) => {
//     try {
//       const res = await axiosInstance.delete(
//         `/posts/${postId}/likes/${userSelector.id}`
//       );

//       const newLike = [...contentList];

//       newLike[idx].like_count--;

//       setContentList(newLike);
//       // console.log(newLike);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const renderContentList = () => {
//     return contentList?.map((val, idx) => {
//       let like_status;
//       let isLiked = val?.post_like;

//       if (isLiked?.length) {
//         like_status = true;
//       } else {
//         like_status = false;
//       }
//       return (
//         <ContentCard
//           username={val.post_user?.username}
//           caption={val.caption}
//           imageUrl={val.image_url}
//           location={val.location}
//           numberOfLikes={val.like_count}
//           comment_count={val.comment_count}
//           dislike_count={val.dislike_count}
//           id={val.id}
//           profile_picture={val.post_user?.avatar}
//           addLikeButton={() => addLikeButton(val.id, idx)}
//           removeLikeButton={() => removeLikeButton(val.id, val.user_id, idx)}
//           userId={val.user_id}
//           like_status={like_status}
//           date={val.date_created}
//           fetchContentList={fetchContentList}
//           key={val?.id?.toString()}
//         />
//       );
//     });
//   };

//   useEffect(() => {
//     fetchContentList();
//   }, [page]);

//   return (
//     <InfiniteScroll
//       dataLength={contentList.length}
//       next={fetchNextPage}
//       hasMore={page < Math.ceil(totalData / maxPostPerPage)}
//       loader={<Spinner />}
//     >
//       <Box paddingY="8" left="0" right="0">
//         {renderContentList()}
//       </Box>
//     </InfiniteScroll>
//   );
// };

// export default HomePage;
