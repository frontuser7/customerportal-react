import React from "react";
import "./Menu.css";
import TablePin from "../../Components/TablePin/TablePin";
import FilterBtn from "../../Components/CategoryBtn/FilterBtn";
import MenuCard from "../../Components/MenuCard/MenuCard";
import ShowItems from "../../Components/ShowItems/ShowItems";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Menu() {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  // get data from store
  const menuDetails = useSelector((state) => state.menuData);
  const restoSessionDetails = useSelector((state) => state.restoSession);
  const restoDetails = useSelector((state) => state.restoData);
  const cartDetails = useSelector((state) => state.cartInfo);
  const ids = useSelector((state) => state.restoTableIds);

  // destructure data
  const { session_pin } = restoSessionDetails;
  const { is_pin_enable, currency } = restoDetails;
  const { restaurantId, tableId } = ids;

  const navigate = useNavigate();

  const handleCart = () => {
    navigate(`/shops/cart/${restaurantId}/${tableId}`);
  };
  return (
    <div>
      {is_pin_enable && <TablePin name={"Pin"} value={session_pin} />}
      <FilterBtn heading={"Category"} />
      <FilterBtn heading={"Sub Category"} />
      <div className="text-center mt-3 mx-2">
        <input
          placeholder="Search Items..."
          className="menuSearch w-100 text-center rounded-2"
        />
      </div>
      <div className="mt-3 mb-5 pb-5">
        {menuDetails &&
          menuDetails.map((item) => (
            <MenuCard key={item.id} itemData={item} currency={currency} />
          ))}
      </div>
      {cartDetails.itemCount ? (
        <div className="position-fixed bottom-0 w-100">
          <ShowItems
            buttonName={"View Cart"}
            backgroundColor={"#e7fde7"}
            color={"#44CE42"}
            handleClick={handleCart}
            currency={currency}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Menu;
