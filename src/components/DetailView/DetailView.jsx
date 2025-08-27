import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { motion, AnimatePresence } from "motion/react";
import { useListStore } from "../../Hooks/useListStore";
import { ask } from "@tauri-apps/plugin-dialog";
import { TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";

export default function DetailView({ setIsVisible }) {
  const selectedItem = useListStore((state) => state.selectedItem);
  const removeItem = useListStore((state) => state.removeItem);
  const [runtime, setRuntime] = useState("3");
  const [view, setView] = useState(false);

  async function chruntime(val) {
    switch (val) {
      case "1":
        await invoke("run_sys_terminal", { content: selectedItem.content });
        break;

      case "2":
        await invoke("open_admin_terminal", { content: selectedItem.content });
        break;

      case "3":
        await invoke("open_terminal", { content: selectedItem.content });
        break;
    }
  }

  const deleteItem = async () => {
    const answer = await ask("Are you sure you want to delete this script?", {
      title: "(S)cripty",
      kind: "warning",
    });

    if (answer === true) {
      removeItem(selectedItem.id);
      setIsVisible(false);
    } else {
      return;
    }
  };

  return (
    <>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="flex flex-col h-screen w-3/5 bg-gradient-to-b from-main1 to-main2 ml-auto"
        >
          <div className="h-1/10 flex items-center justify-between gap-x-17 lg:gap-x-25 xl:gap-x-90 mt-7.5">
            <div className="flex justify-evenly items-center gap-x-10">
              <button
                className="flex justify-center items-center text-white bg-transparent drop-shadow-xl/25 rounded-sm w-10 h-5 ml-5 lg:text-xl lg:w-10 lg:h-10 hover:bg-acc active:translate-y-1  transition-all focus:outline-none cursor-pointer"
                onClick={() => setIsVisible(false)}
              >
                <XMarkIcon className="h-5 lg:h-8" />
              </button>
              <h1 className="text-white font-bold text-2xl font-doto">
                {selectedItem ? selectedItem.title : "File has No name"}
              </h1>
            </div>
            <div className="flex justify-evenly items-center gap-x-3 lg:gap-x-10">
              <button
                className="flex justify-center items-center text-white bg-transparent drop-shadow-xl/25 rounded-sm  w-10 h-5 lg:text-xl lg:w-10 lg:h-10 hover:bg-acc active:translate-y-1 transition-all focus:outline-none cursor-pointer"
                onClick={() => deleteItem()}
              >
                <TrashIcon className="h-5 lg:h-8 " />
              </button>
              <select
                name="rt"
                id="rt"
                value={runtime}
                onChange={(evt) => setRuntime(evt.target.value)}
                className="text-text bg-white w-20 h-5 2xl:text-xl 2xl:w-30 2xl:h-8 focus:outline-none text-center drop-shadow-xl/25 rad"
              >
                <option value="3">User</option>
                <option value="2">Admin</option>
                <option value="1">System</option>
              </select>
              <button
                className="text-white bg-acc rad w-15 h-7 2xl:text-xl 2xl:w-43 2xl:h-11.25 hover:bg-white hover:text-acc transition-all  active:translate-y-1 focus:outline-none mr-5 drop-shadow-xl/25 cursor-pointer"
                onClick={() => chruntime(runtime)}
              >
                Run {">"}
              </button>
            </div>
          </div>

          <div className="bg-blue-100 dark:bg-preview w-full h-9/10 mt-auto overflow-y-auto">
            {selectedItem && (
              <pre className="text-gray-600 dark:text-white p-4 text-[15px] 2xl:text-[20px]">
                {selectedItem.content}
              </pre>
            )}
          </div>
        </motion.div>
    </>
  );
}
