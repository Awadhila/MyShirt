import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state, {setPage} from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs,DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, FilePicker, Tab, CustomButton } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(snap.currentPage);

  };
  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');

  const [generatingImg, setGenratingImg] = useState(false);

  const[activeEditorTab, SetActiveEditorTab] = useState("");
  const[activeFilterTab, SetActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depanding on active tab
  const generateTabContent = () =>{
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
       return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
       />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGenratingImg(true);

      const response = await fetch('https://myshirt-ai-portfolioproject.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGenratingImg(false);
      SetActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }


  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
         state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;     
    }
    // after setting the state, activeFilterTab is update

    SetActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        SetActiveEditorTab("");
      })
  };

  const goBack = () => {
    SetActiveEditorTab(""); // Use the same setter function to update the state
    handlePageChange("home");
  };

  return (
    
    <motion.section key="customizer" className=''>
      <motion.div
        key="custom"
        className="absolute top-0 left-0 z-10"
        { ...slideAnimation('left') }
      >
        <div className="flex items-center min-h-screen">
          <div className="editortabs-container tabs">
            { EditorTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => {if (tab.name == activeEditorTab) {
                  SetActiveEditorTab("")
                } else {
                  SetActiveEditorTab(tab.name)
                }}}
              />
            ))}

            {generateTabContent()}
          </div>
        </div>
      </motion.div>
      <motion.div className="absolute z-10 top-5 right-5"{...fadeAnimation}>
        <CustomButton
            type="filled"
            title="Go Back"
            handleClick={goBack} // Use the handleClick function here
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          />
      </motion.div>
      <motion.div
        className='filtertabs-container'
        {...slideAnimation('up')}
      >
        {FilterTabs.map((tab) => (
          <Tab
            key={tab.name}
            tab={tab}
            isFilterTab
            isActiveTab= {activeFilterTab[tab.name]}
            handleClick={() => {handleActiveFilterTab(tab.name)}} 
          />
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Customizer