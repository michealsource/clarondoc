import React, { useState, useEffect } from 'react'
import './OtcDrugs.css'
import { FaShareAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom"
import MainLayout from "../MainLayout"
import DrugDetailsModal from './DrugDetailsModal';
import CartModal from "../Cart/cart"
import { fetchDrugs } from "../../Api/pharmacy"
import loading from '../../images/loading.gif'
import { TextField } from '@material-ui/core';
import {UPDATECARTINFO, UPDATECARTQUANTITY, REMOVEFROMCART} from '../../features/user'
import { useDispatch,useSelector } from 'react-redux'

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
      display: "flex",
      flexWrap: "wrap",
  },
  floatingLabelFocusStyle: {
      color: "#66cc99"
  },
  textField: {
      width: '90%',
      '.Mui-focused': {
          borderColor: 'yellow !important',
      }
  },
  tab: {
      color: "#525252",
      fontSize: '20px !important'
  },
}));

function PrescribedDrugs() {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [openCartModal, setOpenCartModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [drugs, setDrugs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cart, setCart] = useState([])
  // const [total, setTotal] = useState(0)
  const [falseDrugs, setFalseDrugs] = useState([])
  const cartData = useSelector((state)=>state.user.cart)
  
  const classes = useStyles();

  const drugPrescription =  drugs.filter(function(data) {
    return data.requiresPrescription === true;
  });


  useEffect(() => {
    const getAllDrugs = async () => {
      setIsLoading(true)
      const drug = await fetchDrugs(false)
      
      if (drugs) {
        setDrugs(drug)
        setIsLoading(false)
      }

    }
    getAllDrugs()
  }, [])

  const search = (query) => {
    setFiltered(drugs.filter(drug =>
      drug.name.toLowerCase().includes(query.toLowerCase()) ||
      drug.description.toLowerCase().includes(query.toLowerCase())
    ))
  }

  const getTotal = () => {
    let cartTotal = []
    cartData && cartData.length && cartData.map(item => {
        cartTotal.push(item.total)
    })
    return cartTotal.reduce((acc, total) => acc + total)
  }

  const total = cartData.length ? getTotal() : 0
 

  const addToCart = (item) => {
   
    if (cartData.filter(d => d.drugId === item.id || d.drugId === item.drugId).length === 0) {
      dispatch(UPDATECARTINFO({
        drug: item,
        quantity: 1,
        total: item.unitprice,
        drugId: item.id ?  item.id :  item.drugId,
      }))
    } else if(cartData.filter(d => d.drugId === item.id || d.drugId === item.drugId)) {
      dispatch(UPDATECARTQUANTITY({
        drug: item,
        quantity: 1,
        drugId: item.id ?  item.id :  item.drugId,
      }))
    }
  }

  const removeFromCart = (item) => {
    dispatch(REMOVEFROMCART(item))
  }


  
  return (
    <MainLayout >
      <div className='container-main'>
      <div className="search_field">
        <TextField
          multiline
          id="standard-basic"
          label="Searching for drugs"
          variant="standard"
          onChange={(e) => search(e.target.value)}
          className={classes.textField}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
        />
        

        <div className='cart-mm'>
        {
         cartData !== null && cartData.length ? (
            <CartModal  openModal={openCartModal} removeFromCart={removeFromCart} addToCart={addToCart} setOpenModal={setOpenCartModal} cartItem={cartData} total={total}/>
         ) : null
        }
        </div>
        
      </div>
      <div className="pharmacy-container">

        {isLoading ? (<img src={loading} alt="" className="loader-img" />) : filtered.length ? filtered.map((data) => (
          <div class="drugs-container-out">
            <Link to="" key={data.id} onClick={() => { setOpenModal(true); setProduct(data) }}>
              <div class="drugs-icons">
                <FaShareAlt className="drug-icon" />
                <FaHeart className="drug-icon" />
              </div>
              <img className="drug-img" src={data.avatar} alt="drug-image" />
              <p className="drug-title">{data.name}</p>
              <p class="price">Price</p>
              <h2 className="price">GHS{data.unitprice}</h2>
            </Link>
            <p>My Cart</p>
            <div class="drugs-button-actions">
              <div class="add-to-cart" onClick={() => removeFromCart(data)}>
                <FaShoppingCart className="card" />
                -
              </div>
              <div class="add-to-cart" onClick={() => addToCart(data)}>
                <FaShoppingCart className="card" />
                +
              </div>
            </div>
          </div>
        )) : drugPrescription.map((data) => (
          <div class="drugs-container-out">
            <Link to="" key={data.id} onClick={() => { setOpenModal(true); setProduct(data) }}>
              <div class="drugs-icons">
                <FaShareAlt className="drug-icon" />
                <FaHeart className="drug-icon" />
              </div>
              <img className="drug-img" src={data.avatar} alt="drug-image" />
              <p className="drug-title">{data.name}</p>
              <p class="price">Price</p>
              <h2 className="price">GHS{data.unitprice}</h2>
            </Link>
            <div class="drugs-button-actions">
              <div class="add-to-cart" onClick={() => removeFromCart(data)}>
                <FaShoppingCart className="card" />
                -
              </div>
              <div class="add-to-cart" onClick={() => addToCart(data)}>
                <FaShoppingCart className="card" />
                +
              </div>
            </div>
          </div>
        ))}

        <DrugDetailsModal openModal={openModal} setOpenModal={setOpenModal} product={product} />
      </div>
      </div>
    </MainLayout>
  )
}
export default PrescribedDrugs
