import { useListStore } from "../../Hooks/useListStore";


export function TagFilter() {
  const selectedFilterTags = useListStore(state => state.selectedFilterTags);
  const setFilterTags = useListStore(state => state.setFilterTags);
  const tags= useListStore((state) => state.tags);

  const toggleTag = (tag) => {
    if (selectedFilterTags.includes(tag)) {
      setFilterTags(selectedFilterTags.filter(t => t !== tag));
    } else {
      setFilterTags([...selectedFilterTags, tag]);
    }
  };

  return (
    <div className="flex gap-3">
      {tags.map(tag => (
        <label key={tag} className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFilterTags.includes(tag)}
            onChange={() => toggleTag(tag)}
          />
          <span>{tag}</span>
        </label>
      ))}
    </div>
  );
}