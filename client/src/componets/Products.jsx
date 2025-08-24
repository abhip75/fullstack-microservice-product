import React, {useState, useEffect} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import NavBar from "./NavBar";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:5006/api/Product")
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.log("Error fetching products:", error);
        })
    },[]);

    const handleAddProduct = async (e) => {
        e.preventDefault();

        let imageUrl ="";
        if(file){
           const reader = new FileReader();
           reader.readAsDataURL(file);
           await new Promise((resolve) => {
            reader.onLoad = () => {
                imageUrl = reader.result;
                resolve();
            }
           })
        }

        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            imageUrl
        };

        try{
            const response = await axios.post("http://localhost:5000/api/products", newProduct);
            setProducts([...products, response.data]);
            setName("");
            setDescription("");
            setPrice("");
            setFile(null);
        }catch(error){
            console.log("Error adding product:", error);
        }
    }


    return(
        <>
        <NavBar/>
        <div className="container mt-5">
                        
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="addProductModal">
            Add Product
            </button>

            <div className="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <form onSubmit={handleAddProduct}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Product Name" value={name} onChange={(e) => setProducts(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="File" value={file} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </form>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                {products.map((product) => (
                    <div className="col-md-4" key={product.id}>
                        <div className="card m-1">
                            <img 
                            src={product.imageUrl} 
                            className="card-img-top" 
                            alt={product.name} 
                            style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer" }}
                            />
                            <div className="card-body">
                                <h4 className="card-title">{product.name}</h4>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>$ {product.price}</strong></p>
                                <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default Products;