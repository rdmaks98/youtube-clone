import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = async() => {

  const [video, setVideo] = useState([])
  const query = useLocation().search;
    useEffect(() => {
        const fetchResult = async () => {
            const response = await axios.get(`/videos/search${query}`)
            setVideo(response?.data)
        }
        fetchResult();
    },[query])

  return (
      <Container>
          {video?.map((getVIdeo) => (
              <Card key={getVIdeo?._id} video={getVIdeo} />  
          ))              
          }
    </Container>
  )
}

export default Search