
import type { TOrderItem } from "@/types/order.type";
import Loading from "@components/feedback/loading/loading";
import { Modal, Button } from "react-bootstrap";
import ProductInfo from "@components/ProductInfo/ProductInfo";
import useOrders from "@hooks/useOrders";

export default function Orders() {
    const { showModal, selectedProducts, viewDetailsHandler, closeModalHandler, loading, error, orders } = useOrders();


    return (
        <div>
            <Modal show={showModal} onHide={viewDetailsHandler}>
                <Modal.Header closeButton onHide={closeModalHandler}>
                    <Modal.Title>Order details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column gap-5">
                    {selectedProducts.map((el) => (
                        <div key={el.id}>
                            <ProductInfo
                                direction="column"
                                title={el.title}
                                price={el.price}
                                img={el.img}
                                quantity={el.quantity}
                                totalPrice={el.price * el.quantity}
                            >

                            </ProductInfo>
                        </div>
                    ))}

                </Modal.Body>

            </Modal>
            <h3>My Order</h3>
            <Loading status={loading} error={error} type="table" >
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order Number : </th>
                            <th>Items : </th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((el: TOrderItem) => (
                            <tr key={el.id}>
                                <td>#{el.id}</td>
                                <td>{el.orders.length} item(s){" / "}<span className="text-primary text-decoration-underline cursor-pointer" onClick={() => viewDetailsHandler(el.id)}>Product details</span></td>
                                <td>{el.subtotalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Loading>
        </div>
    )
}