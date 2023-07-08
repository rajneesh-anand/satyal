import { useTranslation } from 'next-i18next';
import { Attachment } from '@framework/types';
import useWindowSize from '@utils/use-window-size';
import Breadcrumb from '@components/ui/breadcrumb';
import cn from 'classnames';
import Image from 'next/image';

interface HeaderProps {
  backgroundThumbnail?: Attachment | string;
  heroTitle?: string;
  mobileBackgroundThumbnail?: Attachment | string;
  variant?: 'default' | 'white';
}

const PageHeroSection: React.FC<HeaderProps> = ({
  backgroundThumbnail = '/assets/images/page-hero-bg.png',
  heroTitle = 'text-page-title',
  mobileBackgroundThumbnail = '/assets/images/page-hero-bg-mobile.png',
  variant = 'default',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <div
      className={cn(
        "flex justify-center md:min-h-[250px] lg:min-h-[288px] pb-[20px] mb-6 md:mb-0 md:pb-0 w-full bg-cover  bg-center page-header-banner   bg-no-repeat ",
        {
          'style-variant-white': variant === 'white',
        }
      )}
      
      style={{
        backgroundImage: `url(${
          width! > 480 ? backgroundThumbnail : mobileBackgroundThumbnail
        })`,
      }}
    >
      <div className="w-[750px] h-[340px] md:h-[300px] flex flex-col-reverse md:flex-row items-center justify-center md:justify-between relative ">
        <div className='absolute bottom-[-50px] z-20 md:static my-6 md:my-0'>
        <h2
          className={cn(
            'text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] font-bold text-center text-dark-footer',
            {
              'text-skin-base': variant === 'default',
              'text-skin-inverted': variant === 'white',
            }
          )}
        >
          <span className="font-manrope block font-bold mb-3 md:mb-4 lg:mb-5 2xl:mb-7 ">
            {t(heroTitle)}
          </span>
        </h2>
        <Breadcrumb />
        </div>
        <div className='h-[300px] md:h-[300px] '>
          <Image src='/images/hero/tandc.svg' alt='team and condition image'
          width={300}
          height={300}
          className='h-[150px] md:h-[300px] border border-solid border-blue-900 object-cover'
         
          />
        </div>
     
      </div>
    </div>
  );
};

export default PageHeroSection;
