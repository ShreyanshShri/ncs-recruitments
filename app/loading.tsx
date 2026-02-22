import Loader from "@/components/common/Loader";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-full w-full min-h-[60vh]">
			<Loader />
		</div>
	);
}
