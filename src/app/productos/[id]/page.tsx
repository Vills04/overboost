"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Usamos useParams para acceder a los parámetros de la URL
import '../product.css'; // Ajusta la ruta según tu estructura
import CommentForm from '@/components/CommentForm'; // Importando CommentForm
import Link from 'next/link';

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any>(null);  // Usar un tipo más específico aquí
    const { id } = useParams(); // Obtenemos el id desde los parámetros de la URL

    // Efecto para cargar los datos del producto cuando se cambia el ID
    useEffect(() => {
        if (id) {
            // Aquí cargarías los datos del producto desde una API o base de datos
            const fetchProduct = async () => {
                const productData = {
                    id: id,
                    name: "Rigorer AR1 Valentine’s Day",
                    description: "Zapatillas edición especial para el Día de San Valentín.",
                    price: 4600,
                    image: "/SHOES/Rigorer_1.png"
                };
                setProduct(productData);  // Reemplazar con datos reales de la API
            };

            fetchProduct();
        }
    }, [id]);

    // Definimos la función handleAddToCart
    const handleAddToCart = () => {
        alert(`Añadido al carrito: ${product.name} - Cantidad: ${quantity}`);
        // Aquí puedes agregar la lógica para agregar el producto al estado global del carrito
        // o alguna lógica para almacenar en la base de datos, según tu implementación
    };

    // Verificar si el producto existe antes de mostrarlo
    if (!product) {
        return <div>Cargando producto...</div>;
    }

    return (
        <div>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/">Inicio</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/hombres">Hombres</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Rigorer 1
                </li>
                </ol>
            </nav>

            <div className="product-page-container">
                <div className="product-content">
                    {/* Imagen del producto */}
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    {/* Información del producto */}
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <h3>${product.price}</h3>

                        {/* Selector de cantidad */}
                        <div className="quantity-selector">
                            <label>Cantidad:</label>
                            <input 
                                type="number" 
                                min="1" 
                                value={quantity} 
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                        </div>

                        {/* Botón para agregar al carrito */}
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>

            <CommentForm /> {/* Mostrando la sección de comentarios formulario */}
        </div>
    );
};

export default ProductPage;
