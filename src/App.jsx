import { useState, useEffect } from "react";
import DetailView from "./components/DetailView/DetailView";
import List from "./components/Form/List";
import Form from "./components/Form/Form";
import FormTag from "./components/Form/FormTag";
import "./App.css";
import { useListStore } from "./Hooks/useListStore";
import { AnimatePresence } from "motion/react";
import TopBar from "./components/TopBar.jsx";
import {check} from "@tauri-apps/plugin-updater";
import {relaunch} from "@tauri-apps/plugin-process";

/*const update = await check();
if (update) {
    console.log(
        `found update ${update.version} from ${update.date} with notes ${update.body}`
    );
    let downloaded = 0;
    let contentLength = 0;

    await update.downloadAndInstall((event) => {
        switch (event.event) {
            case 'Started':
                contentLength = event.data.contentLength;
                console.log(`started downloading ${event.data.contentLength} bytes`);
                break;
            case 'Progress':
                downloaded += event.data.chunkLength;
                console.log(`downloaded ${downloaded} from ${contentLength}`);
                break;
            case 'Finished':
                console.log('download finished');
                break;
        }
    });

    console.log('update installed');
    await relaunch();
}*/


const savedTheme = localStorage.getItem("theme") || "default";
document.documentElement.setAttribute("data-theme", savedTheme);


function App() {
  const [prewOpen, setPrewOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const [tagOpen,setTagOpen] = useState(false);

  const setFilterTag = useListStore((state) => state.setFilterTag);
  const tags = useListStore((state) => state.tags);

  return (
      <>
          <TopBar />
    <main className="flex w-full h-full bg-background dark:bg-form ">
      <div className="h-screen w-72 bg-gradient-to-b from-main1 to-main2 flex flex-col items-center gap-y-17 2xl:w-102 2xl:gap-y-21 transition-all">
        <div className="w-full flex flex-col items-center gap-y-4 mt-30">
          <div className="flex gap-x-5 w-full justify-center">
            <button
              className="bg-card border-none rad drop-shadow-xl/25 w-2/5 h-10 text-[15px] text-text hover:bg-acc hover:text-white 2xl:text-[17px] active:translate-y-1 transition-all focus:outline-none cursor-pointer"
              onClick={() => {
                  if (tagOpen)
                  {
                  setTagOpen(false);
                  setTimeout(() => setPopOpen(prev => !prev), 500);
                  } else setPopOpen(!popOpen);
              }}
            >
              Add Script
            </button>
            <button
              className="bg-card border-none rad drop-shadow-xl/25 w-2/5 h-10 text-[15px] text-text  hover:bg-acc hover:text-white 2xl:text-[17px] active:translate-y-1 transition-all focus:outline-none cursor-pointer"
              onClick={() => {
                  if (popOpen)
                  {
                      setPopOpen(false);
                      setTimeout(() => setTagOpen(prev => !prev), 500);
                  } else setTagOpen(!tagOpen);
              }}
            >
              Add Tag
            </button>
          </div>
          <div className="flex w-full ml-10 2xl:ml-15">
            <select
              name="filt"
              id="filt"
              onChange={(evt) => setFilterTag(evt.target.value)}
              className="text-text  bg-card w-62 h-5 2xl:text-xl 2xl:w-87 2xl:h-7 focus:outline-none text-center drop-shadow-xl/25 rad font-normal"
            >
              <option key={""} value="">
                No Filter
              </option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        <List setVisible={setPrewOpen} visible={prewOpen} />
      </div>
      <AnimatePresence>
        {popOpen && <Form key={1} isVisible={setPopOpen} />}
        {tagOpen && <FormTag key={2} isVisible={setTagOpen} />}
        {prewOpen && <DetailView key={3} setIsVisible={setPrewOpen} />}
      </AnimatePresence>
    </main>
      </>
  );
}

export default App;
