"use client";

export type onChangeHandler = (value: string) => void;

/**
 * Wraps a given function in a setTimeout call with the given milliseconds.
 * @param func The function to wrap.
 * @param wait The number of millisecods to wait before executing.
 * @param args The function args.
 */
function delay<F extends onChangeHandler>(
  func: F,
  wait: number,
  value: string,
): NodeJS.Timeout {
  return setTimeout(function delayWrap() {
    return func(value);
  }, wait);
}

/**
 * Debounce function lifted from underscore.js.
 * @param func The function to wrap.
 * @param wait The number of milliseconds to wait.
 */
function underscoreDebounce<F extends onChangeHandler>(
  func: F,
  wait: number,
): onChangeHandler {
  let timeout: NodeJS.Timeout | null = null;

  const later = function later(value: string) {
    timeout = null;
    func(value);
  };

  return function debouncedFunction(value: string): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = delay(later, wait, value);
  };
}

interface IDebouncedInputProps {
  label: string;
  placeholder: string;
  onInputChange: onChangeHandler;
}

export function DebouncedInput({
  label,
  placeholder,
  onInputChange,
}: IDebouncedInputProps): JSX.Element {
  const debouncedHandleChange = underscoreDebounce(onInputChange, 150);

  return (
    <label className="text-subtle flex flex-col">
      <span className="tracking-0.5px inline-block h-6 text-left text-sm font-semibold">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          debouncedHandleChange((e.target as HTMLInputElement).value)
        }
        className="rounded-md"
      />
    </label>
  );
}
