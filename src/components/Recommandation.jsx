import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from "./Card";

const Container = styled.div`
flex:2;`

const Recommandation = ({tags}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const result = await axios.get(`/videos/tags?tags=${tags}`);
            setVideos(result.data)
        }
        fetchVideos();
    },[tags])

  return (
      <Container>
          {videos?.map((getVideo) => (
          <Card type="sm" key={getVideo._id} video={getVideo}/>
          ))
          }
    </Container>
  )
}

export default Recommandation;