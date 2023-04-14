import { useEffect, useState } from 'react'
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
import { useQuery } from 'react-query'

const getShopDomain = () => {
  if ('object' == typeof Shopify && Shopify.hasOwnProperty('shop')) {
    return Shopify.shop
  } else {
    Array.from(document.getElementsByTagName('script')).forEach((element) => {
      if (
        element.hasAttribute('src') &&
        element.src.includes('age-locker') &&
        element.src.includes('shop=')
      ) {
        return element.src.slice('shop=')[1]
      }
    })
  }
  return document.domain
}

function App() {
  const [count, setCount] = useState(0)
  const { isOpen, onToggle } = useDisclosure()
  const { data, refetch, isLoading } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(
        `https://sales-pop.vercel.app/api/shop-data?shopname=${getShopDomain()}`
      ).then((res) => res.json())
  })

  const [product, setProduct] = useState({})

  useEffect(() => {
    !isLoading &&
      setProduct(
        data?.products[Math.floor(Math.random() * data?.products?.length)]
      )
  }, [onToggle])

  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [count, isLoading])
  return (
    <Slide direction='left' in={isOpen} style={{ zIndex: 10 }}>
      <Card
        id='notification'
        bg={data?.bgColor?.rgba}
        color={'white'}
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
          height={'100px'}
          alignSelf={'center'}
          maxW={{ base: '100%', sm: '100px' }}
          src={
            product?.img === ''
              ? 'https://i.ibb.co/T8pQ9tc/22890125-6689609.jpg'
              : product?.img
          }
          alt='Caffe Latte'
        />
        <Stack>
          <CardBody p={'none'} pl={8}>
            <HStack justifyContent={'space-between'} gap={5}>
              <Text
                color={data?.textColor?.rgba}
                fontWeight={'medium'}
                fontSize={'2.4rem'}>
                {product?.name}
              </Text>
              <Image
                objectFit={'cover'}
                src={notificationImage}
                height={'36px'}
              />
            </HStack>

            <Text color={data?.textColor?.rgba} py='2' fontSize={18}>
              Price: ${product?.price}
            </Text>
            <HStack justifyContent={'space-between'} gap={5}>
              <Badge fontSize={12} my={3} p={1}>
                Ordered Just now
              </Badge>
              <CloseIcon
                onClick={onToggle}
                color={data?.textColor?.rgba}
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
  )
}

export default App
