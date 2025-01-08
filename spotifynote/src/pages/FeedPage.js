// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase';
// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
// import { useNavigate, Link } from 'react-router-dom';
// import '../styles.css';

// function FeedPage() {
//   const [notes, setNotes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNotes = async () => {
//       const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
//       const querySnapshot = await getDocs(q);
//       setNotes(querySnapshot.docs.map((doc) => doc.data()));
//     };

//     fetchNotes();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <nav>
//         <ul>
//           <li>
//             <Link to="/spotify">Spotify</Link>
//           </li>
//           <li>
//             <button onClick={handleLogout}>Logout</button>
//           </li>
//         </ul>
//       </nav>
//       <h2>Feed Page</h2>
//       <div>
//         {notes.map((note, index) => (
//           <div key={index}>
//             <p>{note.note}</p>
//             <small>{note.timestamp?.toDate().toString()}</small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeedPage;

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

function FeedPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, 'notes'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const notesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesList);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/spotify">Spotify</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <h2>Feed Page</h2>
      <div className="notes-section">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <p><strong>Spotify User:</strong> {note.spotifyUser}</p>
            <p><strong>Email:</strong> {note.user}</p>
            <p><strong>Song:</strong> {note.songName}</p>
            <p><strong>Note:</strong> {note.note}</p>
            <p><small><strong>Time:</strong> {note.timestamp?.toDate().toLocaleString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedPage;
