import data from '../data/movies.json';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const randomDelay = () => delay(Math.floor(Math.random() * 250) + 150);

export const getAll = async () => {
  await randomDelay();
  return data;
};

export const getById = async (id) => {
  await randomDelay();
  const item = data.find(d => d.id === id);
  if (!item) throw new Error("Not found");
  return item;
};

export const getBySlug = async (slug) => {
  await randomDelay();
  const item = data.find(d => d.slug === slug);
  if (!item) throw new Error("Not found");
  return item;
};

export const search = async (query) => {
  await randomDelay();
  if (!query) return data;
  const q = query.toLowerCase();
  return data.filter(d => 
    (d.title && d.title.toLowerCase().includes(q)) || 
    (d.name && d.name.toLowerCase().includes(q))
  );
};

export const getTrending = async () => {
  await randomDelay();
  return data.slice(0, 10);
};