interface InputProps<T> {
  name: string;
  label: string;
  type?: string;
  formData: T;
  setFormData: (formData: T) => void;
  placeholder: string;
}

const Input = <T,>({
  formData,
  setFormData,
  name,
  label,
  type = 'text',
  placeholder,
}: InputProps<T>) => {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={name}
        className='eq cursor-pointer self-start hover:text-black/80'
      >
        {label}
      </label>
      <input
        className='eq w-full appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
        type={type}
        value={(formData as any)[name] as string}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        placeholder={placeholder}
        id={name}
        name={name}
      />
    </div>
  );
};

export default Input;
