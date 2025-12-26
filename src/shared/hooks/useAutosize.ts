import { useCallback, useRef } from 'react';

export function useAutosizeTextArea() {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const onInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  const attach = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    ref.current = el;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  return { ref, onInput, attach };
}
