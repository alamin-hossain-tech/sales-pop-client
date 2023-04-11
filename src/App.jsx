import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import notificationImage from './assets/notification.png'
import './App.css'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slide,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function App() {
  const [count, setCount] = useState(0)
  const { isOpen, onToggle } = useDisclosure()
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
      onToggle()

      if (count === 19) {
        clearInterval(intervalId)
        setTimeout(() => {
          setCount(0)
        }, 5000)
      }
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [count])
  return (
    <div>
      <Slide direction='left' in={isOpen} style={{ zIndex: 10 }}>
        <Card
          id='notification'
          bg={'red.700'}
          color={'white'}
          w={600}
          p={4}
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          position={'absolute'}
          left={'2vw'}
          top={'75vh'}
          zIndex={10}>
          <Image
            objectFit='cover'
            rounded={'base'}
            height={'120px'}
            alignSelf={'center'}
            maxW={{ base: '100%', sm: '120px' }}
            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
            alt='Caffe Latte'
          />
          <Stack>
            <CardBody p={'none'} pl={8}>
              <HStack justifyContent={'space-between'}>
                <Heading fontSize={24}>Product Title</Heading>
                <Image
                  objectFit={'cover'}
                  src={notificationImage}
                  height={'36px'}
                />
              </HStack>

              <Text py='2' fontSize={18}>
                Description : Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Quasi, officiis.
              </Text>
              <HStack justifyContent={'space-between'}>
                <Badge fontSize={14} my={3} py={1}>
                  Just now
                </Badge>
                <CloseIcon
                  _hover={{
                    color: 'darkgray',
                    cursor: 'pointer',
                    fontSize: 'xl',
                    transitionDuration: '0.2s'
                  }}
                />
              </HStack>
            </CardBody>
          </Stack>
        </Card>
      </Slide>
    </div>
  )
}

export default App
