import { useContext, useEffect, useState } from 'react';

import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = (props) => {
	const [isBtnHighlighted, setBtnHighlight] = useState(false);
	const cartCtx = useContext(CartContext);

	const numCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const btnClasses = `${styles.button} ${isBtnHighlighted ? styles.bump : ''}`;

	const { items } = cartCtx;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnHighlight(true);

		const timer = setTimeout(() => {
			setBtnHighlight(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{numCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
