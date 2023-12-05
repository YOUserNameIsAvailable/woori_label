import { IoIosArrowUp } from 'react-icons/io';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const BackToTopButton: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScrollListener = debounce((e) => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScrollHeight = document.body.scrollHeight;

      if (
          currentScrollY <= 100 ||
          currentScrollY >= totalScrollHeight - windowHeight - 20
      ) {
        setIsShow(false);
        return;
      }

      setIsShow(true);
    }, 100);

    window.addEventListener('scroll', handleScrollListener);

    return () => {
      window.removeEventListener('scroll', handleScrollListener);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div onClick={handleClick} className={`fixed bottom-20 right-5 z-[100] flex content-center items-center cursor-pointer rounded  w-10  h-10 bg-skin-primary text-skin-inverted transition ease-in-out duration-100 ${!isShow && 'opacity-0'}`}>
      <IoIosArrowUp className="text-xl lg:text-2xl m-auto"  />
    </div>
  )
}

export default BackToTopButton;