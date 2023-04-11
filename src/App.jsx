import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import notificationImage from './assets/notification.png'
import './App.css'
import products from './fakedata/products.json'
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
import { useQuery } from 'react-query'

function App() {
  const [count, setCount] = useState(0)
  const { isOpen, onToggle } = useDisclosure()
  const { data, refetch, isLoading } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch('https://product-management-nine.vercel.app/products').then((res) =>
        res.json()
      )
  })
  const [product, setProduct] = useState({})
  useEffect(() => {
    !isLoading && setProduct(data.products[Math.floor(Math.random() * 6)])
  }, [onToggle])

  console.log(product)
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
            src={product?.img}
            alt='Caffe Latte'
          />
          <Stack>
            <CardBody p={'none'} pl={8}>
              <HStack justifyContent={'space-between'}>
                <Heading color={'white'} fontSize={24}>
                  {product?.name}
                </Heading>
                <Image
                  objectFit={'cover'}
                  src={notificationImage}
                  height={'36px'}
                />
              </HStack>

              <Text py='2' fontSize={18}>
                Price: ${product?.price}
              </Text>
              <HStack justifyContent={'space-between'}>
                <Badge fontSize={14} my={3} p={1}>
                  Ordered Just now
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
