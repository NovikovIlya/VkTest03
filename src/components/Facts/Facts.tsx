import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Facts.module.scss';
import {Button} from '@vkontakte/vkui';

function Facts() {
  const [text, setText] = useState('');
  // Hooks
  const { refetch, data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchFacts(),
    enabled: false,
  });

  const fetchFacts = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setText(data.fact);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (text !== '') {
      const num = text.split(' ')[0].length;
      const textarea: HTMLTextAreaElement | null = document.getElementById(
        'my-textarea',
      ) as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(num, num);
      }
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  console.log(data);
  return (
    <>
      <div className={styles.container}>
        <textarea
          onChange={(e) => handleChange(e)}
          rows={15}
          id="my-textarea"
          value={text}></textarea>

        <div className={styles.btns}>
          <Button onClick={() => refetch()} >
            Получить факт!
          </Button>
        </div>
      </div>
    </>
  );
}

export default Facts;
