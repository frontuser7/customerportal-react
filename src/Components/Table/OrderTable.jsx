import Table from "react-bootstrap/Table";
import "./OrderTable.css";
import { Fragment } from "react";

function OrderTable({ data }) {
  console.log(data);
  let totalBillPrice = 0;
  if (data.length > 0) {
    totalBillPrice = data.reduce((accumulator, currentvalue) => {
      return accumulator + currentvalue.item_total_price;
    }, 0);
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Item Name</th>
          <th>QTY</th>
          <th>Price</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <div>{item.item_name}</div>
                      <div className="d-flex flex-wrap">
                        <div className="fw-bold">Addon's</div>
                        {item.extra_item &&
                          item.extra_item.map((extraItem) => (
                            <div className="ms-1" key={extraItem.id}>
                              {extraItem.extra_item},
                            </div>
                          ))}
                      </div>
                    </div>
                  </td>
                  <td>{item.item_count}</td>
                  <td>{item.item_total_price}</td>
                  <td
                    className={`${
                      item.order_status === "Pending" ? "pending" : "confirm"
                    }`}
                  >
                    {item.order_status}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        <tr>
          <td colSpan={3} className="fw-bold">
            Total Price
          </td>
          <td>{totalBillPrice}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default OrderTable;
