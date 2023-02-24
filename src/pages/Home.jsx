import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const [videos,setVideos] = useState([])

  useEffect(() => {
    console.log(type)
    let fetchByAllVideos = async () => {
      const res = await axios.get(`videos/${type}`)
      setVideos(res?.data)
    };
    fetchByAllVideos()
  },[type])
  
  return (
    <Container>
      {videos?.map(video =>
       
      (<Card key={video?._id} video={video}/>
        )
      )
      }
    </Container>
  );
};

export default Home;
