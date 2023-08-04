import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';


import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);

  if (snap.intro) {
    state.goingBack = false; // Set state.goingBack to true when intro loads
  }

  return (
    <AnimatePresence>

      {snap.intro && (
        <motion.section className='home'{...slideAnimation ('left')}>

          <motion.header {...slideAnimation ("down")}>
            <img 
              src = './threejs.png'
              alt= "logo"
              className="w-8 h-8 object-contain"/>
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                MY <br className='x1:block hidden' /> SHIRT
              </h1>
            </motion.div>
            <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
              <p className='max-w-md font-normal text-gray-600 text-base'>
              Design your own exclusive shirt with our cutting-edge 3D customization tool. Explore limitless possibilities, <strong>unleash your imagination,</strong> and embrace your unique style.
              </p>
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>

        </motion.section >
      )}
    </AnimatePresence>
  )
}

export default Home