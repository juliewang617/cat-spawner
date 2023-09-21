import { Box, Center, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";

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
      await axios.patch(`http://localhost:8080/posts/${postId}/like`, {
        likeCount: likes
      })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}/delete`);
    } catch (err) {
      console.error(err);
    }
  };

 
  return (
    <Box 
      width="31%" 
      borderRadius="30px" 
      overflow="hidden" 
      margin = "5px">

      <Box p={4} bg="white">
        <Text fontSize="xl" fontWeight={600} bg="white" textAlign="center">
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
        <HStack width="100%" margin="10px" bg="white">
          <AiOutlineDelete size="30px" onClick={handleDelete}/>
          <AiOutlineHeart size="30px" onClick={handleLikeClick}/>
          <Text margin="-1" bg="white">{likes}</Text>
          <Text margin="2" bg="white" fontSize="m">{body}</Text >
        </HStack>
      </Box>
    </Box>
  );
};

export default Post;
