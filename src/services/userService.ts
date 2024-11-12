// src/services/userService.ts

interface User {
  id: number;
  name: string;
  age: number;
}

// Пример данных (обычно данные берутся из базы данных или другого источника)
const users: User[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

// Функция для расчета среднего возраста
export const calculateAverageAge = (): number => {
  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  return totalAge / users.length;
};
