import { LoaderIcon } from "../icons";

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-30 z-40"></div>
      <div className="fixed inset-0 z-50">
        <div className="flex justify-center items-center min-h-full">
          <LoaderIcon className="animate-spin fill-blue-600 " />
        </div>
      </div>
    </>
  );
}
