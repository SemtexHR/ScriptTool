import { motion } from "motion/react";
import { useListStore } from "../../Hooks/useListStore";

export default function FormTag({ isVisible}) {
  const addTag = useListStore((state) => state.addTag);

  
  const handletagSubmit = (evt) => {
      evt.preventDefault();
      const tagname = evt.target.tn.value.trim()
      addTag(tagname);
      evt.target.reset();
      isVisible(false);
  }

  

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="w-4/20 flex flex-col items-center gap-y-10  h-screen overflow-y-auto  bg-form mt-7.5"
    >
      <h1 className="flex text-text  text-3xl font-doto font-bold mt-10">
          Add Tag
      </h1>
      <form 
      onSubmit={handletagSubmit}
      className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col items-center w-full space-y-4">
          <label htmlFor="tn" className=" text-text " autoComplete="off">
            Tag Name
          </label>
          <input
            type="text"
            name="tn"
            maxLength={12}
            placeholder="Routine"
            required
            className="bg-card text-text outline-none  w-2/3 h-10  drop-shadow-xl/25 p-2 rad"
          />
        </div>
        <button
          type="submit"
          className="bg-acc border-none rad w-2/3 h-10 text-[15px] drop-shadow-xl/25 mt-auto mb-20 text-white hover:bg-white hover:text-acc lg:text-[17px] active:translate-y-1 transition-all focus:outline-none"
        >
          Add Tag
        </button>
      </form>
      
    </motion.div>
  );
}
