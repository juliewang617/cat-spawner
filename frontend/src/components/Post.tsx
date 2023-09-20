import { Box, Center, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
  title: string;
  image: string;
  body: string;
  likeCount: number;
  postId: string;
}

const Post = ({ title, body, image, likeCount, postId}: Props) => {

  const [likes, setLikes] = useState(likeCount)

  const handleLikeClick = async () => {
    try {
      setLikes((prevLikes) => prevLikes + 1);
      await axios.patch(`/posts/${postId}/like`, {
        likeCount: likes
      })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    } catch (err) {
      console.error(err);
    }
  };

 
  return (
    <Box 
      width="31%" 
      borderRadius="30px" 
      overflow="hidden" 
      margin = "5px"
      textAlign="center">

      <Box p={4} bg="white">
        <Text fontSize="xl" fontWeight={600} bg="white">
          {title}
        </Text>
        <Center bg="white">
          <Image 
            src={image} 
            boxSize="250px" 
            objectFit="cover"
            alt="Kitty"
            borderRadius="10px" />
        </Center>
        <HStack width="100%" bg="white" margin="10px">
          <AiOutlineHeart size="30px" onClick={handleLikeClick}/>
          <Text>{likes}</Text>
          <Text fontSize="m" bg="white">{body}</Text >
        </HStack>
      </Box>
    </Box>
  );
};

export default Post;
