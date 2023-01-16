import moment from 'moment';
import { useState } from 'react';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/styles';
import { Note } from '@/types';
import {
	Form,
	Header,
	StyledButton,
	StyledLink,
} from '../createNotes/CreateNote';

const DeleteButton = styled(Button)`
	--color-danger: rgb(249, 84, 84);
	background: var(--color-danger);
`;

interface EditNotesProps {
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
	handleDelete: (id: string) => void;
}

const EditNote = ({ setNotes, handleDelete }: EditNotesProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { note } = location.state;
	const [title, setTitle] = useState(note.title);
	const [details, setDetails] = useState(note.details);

	const submitChange = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (title && details) {
			const updatedNote = {
				...note,
				title,
				details,
				date: moment().format('MMMM Do YYYY, h:mm:ss a'),
			};
			setNotes((notes) =>
				notes.map((item) => {
					if (item.id === note.id) {
						item = updatedNote;
					}
					return item;
				})
			);
			navigate('/');
		}
	};

	return (
		<section>
			<Header className=''>
				<StyledLink to='/' className=''>
					<BsArrow90DegLeft />
				</StyledLink>
				<StyledButton onClick={submitChange} className=''>
					Save
				</StyledButton>
				<DeleteButton
					onClick={() => {
						handleDelete(note.id);
						navigate('/');
					}}
					className=''
				>
					<RiDeleteBin3Line />
				</DeleteButton>
			</Header>
			<Form onSubmit={submitChange} className=''>
				<input
					type='text'
					placeholder='Title'
					autoFocus
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					rows={24}
					placeholder='Enter Notes ...'
					value={details}
					onChange={(e) => setDetails(e.target.value)}
				></textarea>
			</Form>
		</section>
	);
};

export default EditNote;
