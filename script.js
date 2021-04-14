"use strict";

const patisserie = {
  "Fitchi With Meat": {
    stock: 3,
    price: 9.99,
  },
  "Fitchi With Chicken": {
    stock: 5,
    price: 7.99,
  },
  VeganFitchi: {
    stock: 11,
    price: 12.99,
  },
  FitchiWithPotato: {
    stock: 8,
    price: 16.99,
  },
  FitchiWithSpinach: {
    stock: 9,
    price: 14.99,
  },
};



const checkOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let inStock = patisserie[order[0]].stock >= order[1];

      if (inStock) {
        let totalCost = 0;
          totalCost += order[1] * patisserie[order[0]].price;
      
        console.log(
          `All of the items are in stock. The total cost of the order is ${totalCost}. Type "1" if it is ok?`
        );
        resolve([order, totalCost]);
      } else {
        reject(
          `The order could not be completed because some items are sold out.`
        );
      }
    }, 1000);
  });
};





const payment = (resolvedValueArray) => {
  let order = resolvedValueArray[0];
  let totalCost = resolvedValueArray[1];

  return new Promise((resolve, reject) => {
  setTimeout(() => {
  document.addEventListener("keypress", function (event) {
    let entryKey = event.key;
    if (entryKey === "1") {
        console.log(`Payment processed completed. You paid ${totalCost} $`);
        resolve(order)
      } else {
        reject(`Cannot process order: Thank you choosing us!`);
      }
    });
  }, 2000);
})
}



const stockControl = (order) => {
  return new Promise((resolve, reject) => {
    console.log("To Cashier: Wait for checking stock...")
    setTimeout(() => {
      patisserie[order[0]].stock = patisserie[order[0]].stock - order[1];
      if (patisserie[order[0]].stock > 2) {
        resolve(`${order[0]} stock is enough`);
      } else {
        reject(`${order[0]} stock is ${patisserie[order[0]].stock} and it is critic`);
      }
    }, 3000);
    });
  }

  const cakeType = document.getElementById('cakeSelect');
const orderAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');
const submitBtn = document.getElementById('sub_btn');
const orderResult= document.getElementById('order_result')

  orderBtn.onclick = async() =>{
    let order = [cakeType.value, orderAmount.value]
    try{
      const chek = await checkOrder(order);
      const pay = await payment(chek)
      const stock = await stockControl(pay)

  console.log(stock)
    }catch(err){
      console.log(err)
    }
  }  

orderBtn.onclick=function(){
  submitBtn.style.visibility='visible'; 
  orderBtn.style.visibility='hidden'

}

submitBtn.onclick=function(){
  submitBtn.style.visibility='hidden';
  orderResult.innerHTML=`Your order ${ orderAmount.value} amount of ${ cakeType.value} successfully completed.<br/> Thank you for your order!`
}

