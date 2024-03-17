import React from 'react';
import { useSelector } from 'react-redux';

import ProductBlock from '../components/ProductBlock/index.tsx';

import { useAppDispatch } from '../redux/store.ts';
import { Status, fetchProducts, selectProductsData } from '../redux/slices/productSlice.ts';
import TotalPriceBlock from '../components/TotalPriceBlock/index.tsx';

const Cart: React.FC = () => {
	const dispatch = useAppDispatch();
	const { items, status } = useSelector(selectProductsData);

	const fetchItems = async () => {
		dispatch(fetchProducts());
	};

	React.useEffect(() => {
		fetchItems();
	}, []);

	return (
		<div className='wrapper'>
			<div className='header'>
				<h1>Корзина товаров</h1>
			</div>
			<div className='content'>
				{status === Status.ERROR ? (
					<div className='content-error'>
						<h2>Произошла ошибка 😕</h2>
						<p>К сожалению, не удалось получить запрос. Попробуйте повторить попытку позже.</p>
					</div>
				) : (
					<>
						<div className='content-block'>
							{status === Status.LOADING ? <p>Загрузка...</p> : items.map((obj) => <ProductBlock key={obj.id} {...obj} />)}
						</div>
						<TotalPriceBlock />
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
