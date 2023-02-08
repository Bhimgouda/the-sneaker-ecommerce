require("dotenv").config()
const mongoose = require("mongoose");
const Cart = require("../model/cart");
const Product = require("../model/product");
const User = require("../model/user");

const dbUrl = process.env.MONGODB_URI;
const products = require("./products.json")

mongoose.set("strictQuery", false)
mongoose.connect(dbUrl).then

const seedDB = async()=>{

    await User.create({
        name: 'Bhimgouda Patil',
        email: 'satvikp508@gmail.com',
        profilePic: 'https://lh3.googleusercontent.com/a/AEdFTp4ovFerH97NIOVGAPllxagmTKcy8KvZZvHccJP_CA=s96-c',
        orders: [
          {
            _id: 'cs_test_b1hRtgKKzFypTn6mKigcPZ2BF6Liaiq9WhCRfHhnuQMDAueXZTBnCRDlAj',
            orderAmount: 133790,
            shippingAmount: 0,
            shippingAddress: {
              city: 'Chennai',
              country: 'IN',
              line1: '154/7 Bharthiyar nagar , avadi',
              line2: 'Telenge hills',
              postal_code: '600054',
              state: 'Tamil Nadu'
            },
            images: [
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121976/the-sneaker-ecommerce/shoe-7-1_s2jgoy.webp',
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121975/the-sneaker-ecommerce/shoe-11-1_k2skhl.webp',
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121975/the-sneaker-ecommerce/shoe-4-1_agulp6.webp',
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121974/the-sneaker-ecommerce/shoe-1-1_giu9yg.jpg'
            ],
            orderDate: '08 Feb 2023'
          },
          {
            _id: 'cs_test_a1SYSWyUDRiUF9cIG3DMz4ItXOFoytyILJKckpXSOoVM1LEFnvBLjnDN85',
            orderAmount: 13770,
            shippingAmount: 0,
            shippingAddress: {
              city: 'Chennai',
              country: 'IN',
              line1: '156 Type 2 Bharthiyar nagar',
              line2: 'Avadi',
              postal_code: '600054',
              state: 'Tamil Nadu'
            },
            images: [
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121975/the-sneaker-ecommerce/shoe-2-1_s1x3zu.jpg'
            ],
            orderDate: '22 Jan 2023'
          },
          {
            _id: 'cs_test_b1I9NMLj2eAUBkAbWBBTxAP10o4rfFRy2wXoiyvYGTBo9CRWfFX9XgMpma',
            orderAmount: 114750,
            shippingAmount: 0,
            shippingAddress: {
              city: 'Chennai',
              country: 'IN',
              line1: '156 Type 2 Bharthiyar nagar',
              line2: 'Avadi',
              postal_code: '600054',
              state: 'Tamil Nadu'
            },
            images: [
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121974/the-sneaker-ecommerce/shoe-1-1_giu9yg.jpg',
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121976/the-sneaker-ecommerce/shoe-9-1_mbsrkg.webp'
            ],
            orderDate: '22 Jan 2023'
          },
          {
            _id: 'cs_test_a15I0jbxAsXPPYFmNnV2rEBYlL4rJwDahkLweos7ek7Oj0PB0iNNl8IwRT',
            orderAmount: 10625,
            shippingAmount: 0,
            shippingAddress: {
              city: 'Chennai',
              country: 'IN',
              line1: '156 Type 2 Bharthiyar nagar',
              line2: 'Avadi',
              postal_code: '600054',
              state: 'Tamil Nadu'
            },
            images: [
              'https://res.cloudinary.com/ddmnigwse/image/upload/v1674121974/the-sneaker-ecommerce/shoe-0-1_abui0x.webp'
            ],
            orderDate: '22 Jan 2023'
          }
        ],
        __v: 4
      })

    // await Product.deleteMany()

    // await Product.insertMany(products.map(product=>{
    //     product.originalPrice *=85
    //     product.discountedPrice *=85
    //     return product;
    // }))

    // await Cart.deleteMany({})
    // await User.deleteMany({})

    // mongoose.disconnect()


}

seedDB()