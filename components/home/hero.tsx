import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const Hero = () => {
  return (
    <section className='section-padding container grid min-h-screen grid-rows-2'>
      {/* TOP */}
      <div className='grid h-full w-full grid-cols-[20rem_auto_30rem] gap-5'>
        {/* LEFT */}
        <div className='flex h-full w-full items-center'>
          <div className='h-[15rem] w-[15rem] overflow-hidden rounded-full'>
            <Image
              src='https://images.pexels.com/photos/697244/pexels-photo-697244.jpeg?auto=compress&cs=tinysrgb&w=1600'
              alt='Four Person Standing at Top of Grassy Mountain'
              width={640}
              height={640}
              priority
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        {/* MID */}
        <div className='flex h-full w-full flex-col justify-center gap-5'>
          <h1 className={spaceGrotesk.className}>Epic Journeys Await</h1>
          <h6>
            Explore captivating destinations, from ancient wonders to natural
            marvels. Our expertly crafted tours offer unforgettable adventures
            and cherished memories.
          </h6>
        </div>

        {/* RIGHT */}
        <div className='flex h-full w-full items-center'>
          <div className='h-[30rem] w-full overflow-hidden rounded-full'>
            <Image
              src='https://images.pexels.com/photos/2679814/pexels-photo-2679814.jpeg?auto=compress&cs=tinysrgb&w=1600'
              alt='Two Person Walking on Unpaved Road'
              width={768}
              height={768}
              priority
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className='h-full w-full border border-black'>gg</div>
    </section>
  );
};

export default Hero;
