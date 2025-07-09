interface PortfolioCardProps {
  title: string;
  imageUrl: string;
}

const PortfolioCard = ({ title, imageUrl }: PortfolioCardProps) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow">
      <div className="h-48 w-full rounded-t-lg bg-gray-200 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default PortfolioCard;
