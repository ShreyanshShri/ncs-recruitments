export default function Loading() {
	return (
		<div className="flex items-center justify-center h-full w-full bg-bg-dark">
			<div className="flex items-center justify-center">
				<div className="relative flex items-center justify-center w-24 h-24">
					{/* rotating ring */}
					<div className="absolute inset-0 rounded-full border-2 border-white border-t-white ncs-loader-ring" />

					{/* inner static ring */}
					<div className="absolute inset-2 rounded-full border border-white ncs-loader-ring" />

					{/* text */}
					<span className="text-beige font-shuriken tracking-widest text-lg">
						NCS
					</span>
				</div>
			</div>
		</div>
	);
}
