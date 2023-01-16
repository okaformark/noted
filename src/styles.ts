import styled from 'styled-components';
import css from 'styled-components';

export const buttonStyles = [
	`
	--color-bg-dark: #3a3a3a;
	background: var(--color-bg-dark);
	border-radius: 0.8rem;
	padding: 0.8rem;
	font-size: 1.6rem;
	color: var(--color-white);
	box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
	transition: all 300ms ease;
	&:hover {
		cursor: pointer;
		box-shadow: none;
	}
`,
];

export const Button = styled.button`
	--color-bg-dark: #3a3a3a;
	background: var(--color-bg-dark);
	border-radius: 0.8rem;
	padding: 0.8rem;
	font-size: 1.6rem;
	color: var(--color-white);
	box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
	transition: all 300ms ease;
	&:hover {
		cursor: pointer;
		box-shadow: none;
	}
`;
