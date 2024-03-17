import React from 'react';
import { Product, addItem, deleteItem, removeItem, selectProductById } from '../../redux/slices/productSlice.ts';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ProductBlock: React.FC<Product> = ({ id, image, title, price, description }) => {
	const dispatch = useDispatch();
	const item = useSelector(selectProductById(id));
	let totalPrice = price;

	if (item !== undefined) {
		totalPrice = item.count * price;
	}

	const onClickMinus = () => {
		dispatch(removeItem(id));
	};

	const onClickPlus = () => {
		dispatch(addItem(id));
	};

	const onClickRemove = () => {
		dispatch(deleteItem(id));
	};

	return (
		<div className='product-block'>
			<div className='product-block__image'>
				<img src={image} />
			</div>
			<div className='product-block__title'>
				<h2>{title}</h2>
				<p>{description}</p>
				<h3>{totalPrice} ₽</h3>
				<button className='button-cart' onClick={onClickMinus}>
					-
				</button>
				<span>{item?.count}</span>
				<button className='button-cart' onClick={onClickPlus}>
					+
				</button>
				<button className='button-cart-delete' onClick={onClickRemove}>
					Х
				</button>
			</div>
		</div>
	);
};

export default ProductBlock;
