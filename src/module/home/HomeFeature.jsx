// import Heading from "components/layout/Heading";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/Firebase-config";
import PostFeatureItem from "../post/PostFeatureItem";
const HomeFeatureStyles = styled.div`
  margin-top: 60px;
  .grid-layout {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
`;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "post");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    //- real time update data
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
