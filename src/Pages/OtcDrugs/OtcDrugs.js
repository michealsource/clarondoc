import React, { useState, useEffect } from 'react'
import './OtcDrugs.css'
import { FaShareAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import drugsone from '../../images/drug-one.jpg'
import { Link } from "react-router-dom"
import MainLayout from "../MainLayout"
import DrugDetailsModal from './DrugDetailsModal';
import CartModal from "../Cart/cart"
import { fetchDrugs } from "../../Api/pharmacy"
import loading from '../../images/loading.gif'
import { TextField } from '@material-ui/core';

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

function OtcDrugs() {
  const [openModal, setOpenModal] = useState(false)
  const [openCartModal, setOpenCartModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [drugs, setDrugs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const classes = useStyles();

  console.log(drugs, "dddddd")
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

  let arr = []

  const addToCart = (item) => {

    arr = cart

    if (arr.filter(d => d.drugId == item.id).length == 0) {
      arr.push({
        drug: item,
        quantity: 1,
        drugId: item.id,
      })
    } else {
      arr[arr.indexOf(arr.filter(d => d.drugId == item.id)[0])].quantity += 1
    }

    setCart(arr)
    localStorage.setItem('cart', JSON.stringify(arr))
    setTotal((total + item.unitprice))
  }

  const removeFromCart = (item) => {

    arr = cart

    if (arr.filter(d => d.drugId == item.id).length > 0) {
      if (arr[arr.indexOf(arr.filter(d => d.drugId == item.id)[0])].quantity > 1) {
        arr[arr.indexOf(arr.filter(d => d.drugId == item.id)[0])].quantity -= 1
      } else {
        delete arr[arr.indexOf(arr.filter(d => d.drugId == item.id)[0])]

      }
      setTotal((total - item.unitprice))
    }

    setCart(arr)
    localStorage.setItem('cart', JSON.stringify(arr))
  }

  const getCartItem = localStorage.getItem('cart')
  const myCartItem = JSON.parse(getCartItem)

  return (
    <MainLayout >
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
        {
         myCartItem !== null && myCartItem.length && !cart.length ? (
            <CartModal openModal={openCartModal} setOpenModal={setOpenCartModal} cartItem={myCartItem} total={total}/>
         ) : cart.length && myCartItem.length ? (
            <CartModal openModal={openCartModal} setOpenModal={setOpenCartModal} cartItem={cart} total={total}/>
          ) : null
        }
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
        )) : drugs.map((data) => (
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
    </MainLayout>
  )
}
export default OtcDrugs
