import { useEffect, useState } from 'react';
import styles from './FormComponent.module.scss';
import { useQuery } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';

import { useDebounce } from 'usehooks-ts';

const FormComponent = () => {
  const [value, setValue] = useState<string>('');
  const [double,setDouble] = useState('')
  const debouncedValue = useDebounce<string>(value, 3000);

  const { refetch, data } = useQuery({
    queryKey: ['todos', value],
    queryFn: () => fetchName(value),
    enabled: false,
  });

  const fetchName = async (value: string) => {
    try {
      const response = await fetch(`https://api.agify.io?name=${value}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    refetch();
    setDouble(value)
  };

  useEffect(() => {
    if (value && value !== double) {
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div>
      <form>
        <input type="text" value={value} onChange={handleChange} />
        <button onClick={handleButton}>Отправить</button>
      </form>
      <div>{data?.age}</div>
    </div>
  );
};

export default FormComponent;
