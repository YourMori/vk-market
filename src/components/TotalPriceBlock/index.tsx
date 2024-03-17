import React from 'react';
import { useSelector } from 'react-redux';

import { selectProducts } from '../../redux/slices/productSlice.ts';

const TotalPriceBlock = () => {
	const items = useSelector(selectProducts);
	const totalPrice = items.reduce((sum, obj) => sum + obj.price * obj.count, 0);

	return (
		<div className='price-block'>
			<p>Итого: {totalPrice.toFixed(2)} руб.</p>
		</div>
	);
};

export default TotalPriceBlock;
