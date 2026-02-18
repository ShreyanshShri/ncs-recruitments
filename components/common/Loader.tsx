export default function Loader() {
	return (
		<div className="flex items-center justify-center">
			<div className="relative flex items-center justify-center w-24 h-24">
				{/* rotating ring */}
				<div className="absolute inset-0 rounded-full border-2 border-border-red border-t-primary-red ncs-loader-ring" />

				{/* inner static ring */}
				<div className="absolute inset-2 rounded-full border border-border-red ncs-loader-ring" />

				{/* text */}
				<span className="text-beige font-shuriken tracking-widest text-lg">
					NCS
				</span>
			</div>
		</div>
	);
}
