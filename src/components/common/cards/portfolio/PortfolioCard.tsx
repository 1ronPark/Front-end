import { X } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  imageUrl: string;
  onDelete?: () => void; // onDelete prop 추가
}

const PortfolioCard = ({ title, imageUrl, onDelete }: PortfolioCardProps) => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white shadow hover:scale-105 hover:cursor-pointer">
      <div className="h-36 w-full rounded-t-lg bg-gray-200 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-medium font-semibold">{title}</h3>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75 focus:outline-none hover:cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default PortfolioCard;
