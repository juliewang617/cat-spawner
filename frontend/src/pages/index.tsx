import {Button, Container, Stack, HStack, Spacer, Text, VStack, Flex} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import NewPostModal from "@/components/NewPostModal";
import Post from "@/components/Post";
import axios from "axios";

export default function Home() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [postLog, setPostLog] = useState([])


  useEffect(() => {
    axios
    .get("http://localhost:8080/posts")
    .then(({data}) => {
      setPostLog(data);
    })
    .catch((error) => {
      console.log(error);
    })
    
  }, []);

  return (
    <div>
      <NewPostModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)}
      />
      <Container maxW="container.l">
        <VStack>
          <Text fontSize="5xl" fontWeight={800}>
            Cat Spawner
          </Text>
          <Spacer />
          <Button 
            bg="black" 
            textColor="white" 
            fontSize="xl" 
            onClick={() => setNewPostDialog(true)}>Spawn</Button>
        </VStack>
        <Flex
          alignItems="center" 
          my={10}
          flexWrap="wrap">
          {postLog.map((cat) => (
            <Post
              key={cat._id}
              image={cat.image}
              title={cat.title}
              body={cat.body}
              likeCount={cat.likeCount}
              postId={cat._id}
              />
          ))}
        </Flex>
      </Container>
    </div>
  );
}
