import { useEffect, useState } from 'react';
import styles from './FormComponent.module.scss';
import { useQuery } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import {Button} from '@vkontakte/vkui';

import { useDebounce } from 'usehooks-ts';

const FormComponent = () => {
  // Стейты
  const [value, setValue] = useState<string>('');
  const [double, setDouble] = useState('');
  const debouncedValue = useDebounce<string>(value, 3000);

  // Hooks
  //// Отправка запроса
  const { refetch, data } = useQuery({
    queryKey: ['todos', value],
    // добавлен signal - для отмены "старых" хзапросов
    queryFn: ({signal}) => fetchName({signal}, value),
    enabled: false,
  });

  //// Дебаунс запроса
  useEffect(() => {
    if (value && value !== double) {
      refetch({ cancelRefetch: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // Функции
  //// функция отправки
  const fetchName = async ({ signal }: any, value: string) => {
    try {
      const response = await axios.get(`https://api.agify.io?name=${value}`, {
        signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Изменение инпута
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // Отправка запроса при клике
  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value !== double) {
      refetch();
      setDouble(value);
    }
  };

  return (
    <div>
      <form>
        <input type="text" value={value} onChange={handleChange} />
        <Button onClick={handleButton}>Отправить</Button>
      </form>
      <div>{data?.age}</div>
    </div>
  );
};

export default FormComponent;
