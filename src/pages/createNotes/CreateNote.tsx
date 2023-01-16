import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { Note } from '@/types';
import styled from 'styled-components';
import { Button } from '@/styles';

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const StyledLink = styled(Link)`
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

export const StyledButton = styled(Button)`
	--color-primary: #7634d8;
	padding: 0.8rem 1.5rem;
	font-size: 1.2rem;
	box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.4);
	background: var(--color-primary);
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 2rem;
	& input,
	textarea {
		width: 100%;
		padding: 0.5rem 1rem;
		background: transparent;
		border-radius: 0.2rem;
		font-size: 1.1rem;
		color: var(--color-white);
	}
	& input {
		font-size: 2rem;
	}
`;

interface CreateNotesProps {
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const CreateNote = ({ setNotes }: CreateNotesProps) => {
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');

	const navigate = useNavigate();

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (title && details) {
			const note = {
				id: uuid(),
				title,
				details,
				date: moment().format('MMMM Do YYYY, h:mm:ss a'),
			};
			setNotes((notes) => [note, ...notes]);
			setTitle('');
			setDetails('');
			navigate('/');
		}
	};

	return (
		<section>
			<Header className=''>
				<StyledLink to='/' className=''>
					<BsArrow90DegLeft />
				</StyledLink>
				<StyledButton className='' onClick={handleSubmit}>
					Save
				</StyledButton>
			</Header>
			<Form className='' onSubmit={handleSubmit}>
				<input
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					type='text'
					placeholder='Title'
					autoFocus
					required
				/>
				<textarea
					onChange={(e) => setDetails(e.target.value)}
					value={details}
					rows={24}
					placeholder='Enter Notes ...'
					required
				></textarea>
			</Form>
		</section>
	);
};

export default CreateNote;
