interface TextareaProps<T> {
  name: string;
  label: string;
  formData: T;
  setFormData: (formData: T) => void;
  rows?: number;
  placeholder: string;
}

const Textarea = <T,>({
  formData,
  setFormData,
  name,
  label,
  rows = 5,
  placeholder,
}: TextareaProps<T>) => {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={name}
        className='eq cursor-pointer self-start hover:text-black/80'
      >
        {label}
      </label>
      <textarea
        className='eq w-full resize-none appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
        value={(formData as any)[name] as string}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        placeholder={placeholder}
        id={name}
        name={name}
        rows={rows}
      />
    </div>
  );
};

export default Textarea;
