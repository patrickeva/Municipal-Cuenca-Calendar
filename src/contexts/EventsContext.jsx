import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MOCK_EVENTS } from '../data/mockEvents';

const EventsContext = createContext(null);

const COLLECTION = 'events';

function clean(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, COLLECTION), (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEvents(docs);
      setLoaded(true);
    });
    return unsub;
  }, []);

  // Seed mock events once if the collection is empty
  useEffect(() => {
    if (!loaded || seeded || events.length > 0) return;
    setSeeded(true);
    const col = collection(db, COLLECTION);
    MOCK_EVENTS.forEach((e) => {
      const { id: _id, ...data } = e;
      addDoc(col, clean(data));
    });
  }, [loaded, seeded, events.length]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const addEvent = useCallback(async (data) => {
    const ref = await addDoc(collection(db, COLLECTION), clean({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    addToast('Event added successfully!');
    return { id: ref.id, ...data };
  }, [addToast]);

  const updateEvent = useCallback(async (id, data) => {
    await updateDoc(doc(db, COLLECTION, id), clean({
      ...data,
      updatedAt: new Date().toISOString(),
    }));
    addToast('Event updated successfully!');
  }, [addToast]);

  const deleteEvent = useCallback(async (id) => {
    await deleteDoc(doc(db, COLLECTION, id));
    addToast('Event deleted.', 'info');
  }, [addToast]);

  const getEventById = useCallback((id) => events.find((e) => e.id === id), [events]);

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEventById, toasts }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents must be used within EventsProvider');
  return ctx;
}
