import { useEffect, useRef, useState } from 'react';
import styles from './FormComponent.module.scss';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDebounce } from 'usehooks-ts';

type Inputs = {
  example: string;
  exampleRequired: string;
};

const FormComponent = () => {
  // Стейты
  const [value, setValue] = useState<string>('');
  const [double, setDouble] = useState('');
  const ref = useRef<HTMLButtonElement>(null);
  const debouncedValue = useDebounce<string>(value, 3000);

  // Hooks
  //// Валидация
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      example: '',
    },
  });

  //// Отправка запроса
  const { refetch, data } = useQuery({
    queryKey: ['todos', value],
    // добавлен signal - для отмены "старых" хзапросов
    queryFn: ({ signal }) => fetchName({ signal }, value),
    enabled: false,
  });

  //// Дебаунс запроса
  useEffect(() => {
    if (value) {
      ref?.current?.click();
    }
    if (value && value !== double && !errors) {
      refetch({ cancelRefetch: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  //// Просмотр за полем
  useEffect(() => {
    setValue(watch('example'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('example')]);

  // Функции
  //// функция отправки
  const fetchName = async ({ signal }: { signal: AbortSignal }, value: string) => {
    try {
      const response = await axios.get(`https://api.agify.io?name=${value}`, {
        signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  //// "Отправить"
  const handleButton: SubmitHandler<Inputs> = (data) => {
    console.log(data.example);
    if (value !== double) {
      refetch();
      setDouble(value);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.forms} onSubmit={handleSubmit(handleButton)}>
        <input
          {...register('example', {
            required: 'Это поле обязательно',
            pattern: {
              message: 'Имя может содержать только буквы',
              value: /^[a-zA-Z\u0410-\u044F]+(?:\s[a-zA-Z\u0410-\u044F]+)*$/,
            },
          })}
          defaultValue="test"
        />
        <div className={styles.btnsParent}>
          <button className={styles.btns} ref={ref} type="submit">
            Отправить
          </button>
        </div>
      </form>
      <ErrorMessage errors={errors} name="example" render={({ message }) => <p>{message}</p>} />
      {data?.age && (
        <div className={styles.age}>
          Возраст {data.name}: {data.age}
        </div>
      )}
      <div>{data && data.age === null && 'Нет возраста для этого имени ;c'}</div>
    </div>
  );
};

export default FormComponent;
