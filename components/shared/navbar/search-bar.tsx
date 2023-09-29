import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  shouldSearchBarShown: boolean;
  setShouldSearchBarShown: (shouldSearchBarShown: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setShouldSearchBarShown,
  shouldSearchBarShown,
}) => {
  const handleToggleSearchBar = useCallback(() => {
    setShouldSearchBarShown(!shouldSearchBarShown);
  }, [setShouldSearchBarShown, shouldSearchBarShown]);

  return (
    <div className='w-full'>
      <form className='relative flex w-full items-center justify-end'>
        <span
          onClick={handleToggleSearchBar}
          className={cn(
            'cursor-pointer text-2xl',
            shouldSearchBarShown && 'absolute left-6 top-1/2 -translate-y-1/2'
          )}
        >
          <AiOutlineSearch />
        </span>
        {shouldSearchBarShown && (
          <input
            type='text'
            placeholder='Search your destinations'
            className='eq w-full rounded-xl border border-black/20 bg-transparent py-3 pl-[72px] pr-6 outline-none placeholder:text-black/40 focus:border-black/60'
          />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
