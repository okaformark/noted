import { Link } from 'react-router-dom';
import { Note } from '@/types';
import styled from 'styled-components';

interface NoteItemProps {
	note: Note;
}

const StyledLink = styled(Link)`
	--color-primary: #7634d8;
	--color-white: #fefefe;
	background: var(--color-primary);
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	cursor: pointer;
	border-radius: 12px;
	transition: all 300ms ease;
	color: var(--color-white);
	&:hover {
		opacity: 0.8;
	}
	&:nth-child(3) {
		grid-column: 1/3;
	}
	&:nth-child(2n + 2) {
		background: #d85e45;
	}

	&:nth-child(4) {
		grid-row: 3/5;
	}
	&:nth-child(3n + 3) {
		background: #d8691a;
	}

	&:nth-child(7) {
		grid-column: 1/3;
	}
	&:nth-child(4n + 4) {
		background: #5062d8;
	}
	& p {
		font-size: 0.8rem;
		opacity: 0.85;
	}
`;

const NoteItem = ({ note }: NoteItemProps) => {
	return (
		<StyledLink to={`/edit-note/${note.id}`} state={{ note }}>
			<h4>
				{note.title.length > 40
					? note.title.substring(0, 40) + ' ... '
					: note.title}
			</h4>
			<p>{note.date}</p>
		</StyledLink>
	);
};

export default NoteItem;
