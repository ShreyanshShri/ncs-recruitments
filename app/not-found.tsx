import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-bg-dark text-beige flex items-center justify-center px-6">
			<div className="text-center space-y-8 max-w-2xl">
				<h1 className="font-shuriken text-primary-red text-6xl sm:text-8xl tracking-widest">
					404
				</h1>

				<h2 className="font-shuriken text-2xl sm:text-3xl text-beige tracking-wide">
					PAGE NOT FOUND
				</h2>

				<p className="text-light-beige text-lg">
					The path you tried to access does not exist or has not been forged
					yet.
				</p>

				<div>
					<Link
						href="/"
						className="inline-block font-shuriken text-primary-red text-lg tracking-wide hover:text-dark-red transition"
					>
						Return to Homepage
					</Link>
				</div>
			</div>
		</div>
	);
}
