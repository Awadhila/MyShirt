import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { CustomButton } from '../components';
import state, {setPage} from '../store';


import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  fadeAnimation,
  slideAnimation
} from '../config/motion';

const goBack = () => {
    state.currentPage = "home";
};

const Authentication = () => {

    const snap = useSnapshot(state);

    return (
            
        <motion.section key="authentication"  {...slideAnimation('left')}>
            <motion.div className="home">
                <motion.header {...slideAnimation ("down")}>
                    <img 
                    src = './threejs.png'
                    alt= "logo"
                    className=" w-8 h-8 object-contain"/>
                </motion.header>
                <motion.div className="home-content" {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h3 className='head-text'>LOG<br className='x1:block hidden' /> IN</h3>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div className="absolute z-10 top-5 right-5"{...fadeAnimation}>
                <CustomButton
                    type="filled"
                    title="Go Back"
                    handleClick={goBack} // Use the handleClick function here
                    customStyles=" w-fit px-4 py-2.5 font-bold text-sm"
                />
            </motion.div>

        </motion.section>

    )
}

export default Authentication