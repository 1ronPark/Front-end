
interface ProjectDescriptionProps {
  value: number;
  onChange: (value: number) => void;
}

const ProjectDescription = ({ value, onChange }: ProjectDescriptionProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value > 1 ? value - 1 : 1);

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          -
        </button>
        <span className="text-base font-medium">{value}</span>
        <button
          onClick={increment}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProjectDescription;