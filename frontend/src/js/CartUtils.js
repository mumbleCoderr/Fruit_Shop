export const createFruitObjectFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
  
    const fruit = {};
  
    for (const key in cart) {
      const fruitItem = JSON.parse(key);

      fruit[fruitItem.name] = {
        ...fruitItem,
        orderedQuantity: cart[key]
      };
    }
  
    return fruit;
  };

  export const calculateFruitTotalPrice = (fruit) => {
    const { price, orderedQuantity } = fruit;
    return price * orderedQuantity;
  };

export const removeFruitFromCart = (fruitName) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    
    for (const key in cart) {
      const fruitItem = JSON.parse(key);
      
      if (fruitItem.name === fruitName) {
        delete cart[key];
        break;
      }
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const calculateTotalPrice = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let total = 0;
  
    for (const key in cart) {
      const fruitItem = JSON.parse(key);
      const fruitQuantity = cart[key];
      
      const fruitPrice = fruitItem.price * fruitQuantity;
      
      total += fruitPrice;
    }
  
    return total;
  };

  export const createFruitToSend = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    
    const fruitMap = {};
 
    for (const key in cart) {
      const fruitItem = JSON.parse(key);

      fruitMap[fruitItem.id] = cart[key];
    }
  
    return fruitMap;
  };
  
  