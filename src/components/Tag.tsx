interface TagProps {
  label: string;
  onClick: (label: string) => void;
  isSelected: boolean;
}

const Tag = ({ label, onClick, isSelected }: TagProps) => {
  return (
    <button
      className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 transition-colors 
        ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} 
        hover:bg-blue-700 hover:text-white`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Tag;
