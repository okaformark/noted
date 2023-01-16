import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import CreateNote from './pages/createNotes/CreateNote';
import EditNote from './pages/editNotes/EditNote';
import Notes from './pages/notes/Notes';
import { useEffect, useState } from 'react';
import { Note } from './types';

const Main = styled.main`
	--color-bg-black: #111111;
	background: var(--color-bg-black);
	height: 48rem;
	width: 36rem;
	padding: 2rem 1.6rem;
	overflow-y: scroll;
	position: relative;
	border-radius: 12px;
	@media (max-width: 600px) {
		width: 100vw;
		height: 100vh;
		padding: 2rem 1rem;
	}
`;

function App() {
	const [notes, setNotes] = useState<Note[]>(
		JSON.parse(localStorage.getItem('notes')!) || []
	);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	const handleDelete = (id: string) => {
		if (window.confirm('Are you sure?')) {
			const newNotes = notes.filter((note) => note.id != id);
			setNotes(newNotes);
		}
	};

	return (
		<Main>
			<Router>
				<Routes>
					<Route path='/' element={<Notes notes={notes} />} />
					<Route
						path='/create-note'
						element={<CreateNote setNotes={setNotes} />}
					/>
					<Route
						path='/edit-note/:id'
						element={
							<EditNote setNotes={setNotes} handleDelete={handleDelete} />
						}
					/>
				</Routes>
			</Router>
		</Main>
	);
}

export default App;
