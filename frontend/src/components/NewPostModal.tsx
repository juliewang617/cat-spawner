import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Input, Textarea, VStack, Image } from "@chakra-ui/react";
import axios from "axios";


interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [catImageUrl, setCatImageUrl] = useState("");

  useEffect(() => {
    // Fetch a random cat image when the modal opens
    if (isOpen) {
      axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then((response) => {
          if (response.data.length > 0) {
            setCatImageUrl(response.data[0].url);
          }
        })
        .catch((error) => {
          console.error("Error fetching cat image:", error);
        });
    }
  }, [isOpen]);

  function handleSubmit(e: any) {
    // Block the default form handler behavior.
    e.preventDefault();

    // Set isLoading to true while we make the API request.
    setIsLoading(true);

    // TODO: Make a POST request with the form data to the /posts endpoint
    axios
      .post("http://localhost:8080/posts", {
        title: e.target.title.value,
        body: e.target.body.value,
        image: catImageUrl,
        likeCount: 0,
      })
      .then(function (response) {
        // handle success
        onClose();
        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }

  // TODO: Implement a modal for creating a new post
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Spawn a new cat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Image src={catImageUrl}/>
              <Input required name="title" placeholder="Name this cat" />
              <Textarea required name="body" placeholder="Anything we should know about this cat?" />
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button bg="black" textColor="white"  type="submit" isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewPostModal;
