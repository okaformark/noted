import { RiCloseCircleLine, RiCloseFill, RiSearch2Line } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import NoteItem from '@/components/notes/NoteItem.js';
import { Link } from 'react-router-dom';
import { Note } from '@/types';
import { Button } from '@/styles';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface NotesProps {
	notes: Note[];
}

const Header = styled.header`
	--color-bg-black: #111111;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1.6rem 1.5rem;
	background: var(--color-bg-black);
	z-index: 9;

	& input {
		padding: 0.7rem 1rem;
		background: transparent;
		border: 1px solid var(--color-bg-dark);
		border-radius: 0.6rem;
		color: var(--color-white);
		font-size: 1.1rem;
		width: 100%;
		margin-right: 1.5rem;
	}

	@media (max-width: 600px) {
		width: 100%;
		padding: 2rem 1rem;
		position: fixed;
		top: 0;
		left: 0;
	}
`;

const NoteContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.2rem;
	@media (max-width: 600px) {
		margin-top: 5rem;
		gap: 1rem;
	}
`;

const P = styled.p`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

const StyledLink = styled(Link)`
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
	position: fixed;
	bottom: 4rem;
	right: 7rem;
	padding: 1rem;
	@media (max-width: 600px) {
		padding: 1.5rem;
		font-size: 1.5rem;
		bottom: 6%;
		right: 2rem;
	}
`;

const Notes = ({ notes }: NotesProps) => {
	const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');
	const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

	const filterNotes = () => {
		setFilteredNotes(
			notes.filter((note) => {
				return note.title.toLowerCase().includes(query.toLowerCase());
			})
		);
	};

	useEffect(filterNotes, [query]);

	return (
		<section>
			<Header className=''>
				{!showSearchInput && <h2>My Notes</h2>}
				{showSearchInput && (
					<input
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
						type='text'
						autoFocus
						placeholder='Type something ...'
					/>
				)}
				<Button
					onClick={() => setShowSearchInput((prev) => !prev)}
					className='btn'
				>
					{showSearchInput ? <RiCloseFill /> : <RiSearch2Line />}
				</Button>
			</Header>
			<NoteContainer className=''>
				{filteredNotes.length === 0 ? (
					<P className=''>No notes found</P>
				) : (
					filteredNotes.map((note) => <NoteItem key={note.id} note={note} />)
				)}
			</NoteContainer>
			<StyledLink to='/create-note' className=''>
				<GoPlus />
			</StyledLink>
		</section>
	);
};

export default Notes;
