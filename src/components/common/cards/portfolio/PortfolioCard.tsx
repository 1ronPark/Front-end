// import { X } from "lucide-react";

export interface PortfolioCardProps {
  title: string;
  imageUrl: string;
  fileUrl?: string; // Optional, if the card is for a file
  linkUrl?: string; // Optional, if the card is for a link
  onDelete?: () => void;
}

const PortfolioCard = ({ title, imageUrl, fileUrl, linkUrl, }: PortfolioCardProps) => {
  const handleClick = () => {
    const url = fileUrl || linkUrl;
    if (url) {
      window.open(url, "_blank");
    }
  };
  return (
    <div
      onClick={handleClick}
      className="relative rounded-lg border border-gray-300 bg-white shadow hover:scale-105 hover:cursor-pointer"
    >
      <div className="h-36 w-full rounded-t-lg bg-gray-200 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-medium font-semibold">{fileUrl}</h3>
      </div>
      {/* <button
        className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75 focus:outline-none hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
      >
        <X size={16} />
      </button> */}
    </div>
  );
};

export default PortfolioCard;
