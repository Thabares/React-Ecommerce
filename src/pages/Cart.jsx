import styled, { keyframes } from 'styled-components';
import Announcement from '../components/Announcement';
import NewsLetter from '../components/Newsletter';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Add, Remove } from '@material-ui/icons';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: '5px 15px' })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const SlideIn = keyframes`
from {bottom: -300px; opacity: 0}
to {bottom: 50%; opacity: 1}
`;

const fadeIn = keyframes`
from {opacity: 0} 
to {opacity: 1}
`

const Modal = styled.div`
display: ${props => props.paymentModal ? "block" : "none"};  /* Hidden by default */
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
-webkit-animation-name: ${fadeIn}; /* Fade in the background */
-webkit-animation-duration: 0.4s;
animation-name: ${fadeIn};
animation-duration: 0.4s
`
const ModalContent = styled.div`
position: fixed;
bottom: 50%;
background-color: #fefefe;
width: 50%;
left: 25%;
-webkit-animation-name: ${SlideIn};
-webkit-animation-duration: 0.4s;
animation-name: ${SlideIn};
animation-duration: 0.4s
`
const ModalHeader = styled.div`
padding: 2px 16px;
  background-color: #5cb85c;
  color: #fff;
`
const CloseModal = styled.span`
color: #fff;
float: right;
font-size: 28px;
font-weight: bold;
&:hover, &:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
`
const ModalBody = styled.div`
padding: 2px 16px;
height: 5rem;
display: flex;
justify-content: space-around;
align-items: center;
.button
`

const PaymentButtons = styled.button`
background-color: ${props => props.type === 'success' ? "#5cb85c" : "#ff2d2d"};
border: none;
font-size: 1rem;
font-weight: 800;
padding: 5px;
cursor: pointer;
color: #fff;
`



const Cart = () => {
  const cart = useSelector(state => state.cart)
  const [paymentModal, setPaymentModal] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("")
  const history = useHistory()

  const handlePayment = () => {
    setPaymentModal(!paymentModal)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          amount: cart.total * 100,
          paymentStatus,
          orderDetails: {
            name: "Lama Shop",
            image: "https://avatars.githubusercontent.com/u/1486366?v=4",
            billingAddress: "jtj",
            shippingAddress: "jtj",
            description: `Your total is $${cart.total}`,
            amount: cart.total * 100
          }
        })
        if (paymentStatus === "success") {
          history.push("/success", { paymentData: res.data, products: cart })
        } else {
          history.push("/failure")
        }
      } catch (err) {

      }
    }
    paymentStatus && makeRequest()
  }, [paymentStatus, cart.total, history])


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={(event) => {
            history.push("/")
          }}>CONTINUE SHOPPPING</TopButton>

          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />

                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
            )

            )}

            <Hr />

          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            <SummaryButton onClick={handlePayment}>CHECKOUT NOW</SummaryButton>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />

      <Modal id="myModal" paymentModal={paymentModal}>
        <ModalContent >
          <ModalHeader >
            <CloseModal onClick={handlePayment}>&times;</CloseModal>
            <h2>Payment Confirmation</h2>
          </ModalHeader>
          <ModalBody >
            <PaymentButtons type={"success"} onClick={() =>
              setPaymentStatus("success")
            }>Success</PaymentButtons>
            <PaymentButtons type={"failure"} onClick={() =>
              setPaymentStatus("failure")
            }>Failure</PaymentButtons>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Container>
  );
};

export default Cart;
