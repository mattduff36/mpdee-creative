interface ConstructionBannerProps {
  className?: string;
}

export default function ConstructionBanner({ className = '' }: ConstructionBannerProps) {
  return (
    <div className={`bg-orange-100 text-orange-800 px-4 py-2 text-center text-sm ${className}`}>
      🚧 Website under construction - Some features may be temporarily unavailable
    </div>
  );
}
