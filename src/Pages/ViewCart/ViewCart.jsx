import React from "react";
import "./ViewCart.css";
import ViewCartCard from "../../Components/ViewCartCard/ViewCartCard";
import ShowItems from "../../Components/ShowItems/ShowItems";

function ViewCart() {
  const handlePlaceOrder = () => {
    console.log("Clicked");
  };
  return (
    <div>
      <ViewCartCard />
      <ViewCartCard />
      <div className="position-fixed bottom-0 w-100">
        <ShowItems
          buttonName={"Place Order"}
          backgroundColor={"#e7fde7"}
          color={"#44CE42"}
          handleClick={handlePlaceOrder}
        />
      </div>
    </div>
  );
}

export default ViewCart;
