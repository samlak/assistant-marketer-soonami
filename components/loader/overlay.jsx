import CircularLoader from "./circular";

export default function OverlayLoader({ children }) {
  return (
    <div className="absolute top-0 left-0 bg-blue-50/90 w-full h-full flex justify-center items-center rounded-lg z-40">
      <div className="flex flex-col justify-center items-center text-center">
        <CircularLoader />
        {children}
      </div>
    </div>
  );
}
