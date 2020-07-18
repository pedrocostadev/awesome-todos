const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

const TODOS = [
  { text: 'Lavar a roupa', user: 'pedro', createdDate: today.toDateString(), dueDate: undefined },
  { text: 'Secar o cabelo', user: 'pedro', createdDate: today.toDateString(), dueDate: tomorrow.toDateString() },
  { text: 'Alimentar o cão', user: 'pedro', createdDate: today.toDateString(), dueDate: undefined },
];

export default TODOS;
