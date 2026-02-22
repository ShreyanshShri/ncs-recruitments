export default function ProfilePage({ data }: any) {
	const { user } = data;

	return (
		<div className="max-w-3xl">
			<h2 className="text-3xl font-shuriken text-primary-red mb-8 tracking-wide">
				Profile
			</h2>

			<div className="relative rounded-2xl bg-bg-dark border border-border-red shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-hidden">
				<div className="h-1 w-full bg-primary-red" />

				<div className="p-6 sm:p-8 space-y-8">
					<div className="space-y-1">
						<p className="text-sm uppercase tracking-widest text-beige/50 font-shuriken">
							Student
						</p>
						<p className="text-2xl sm:text-3xl font-shuriken text-beige">
							{user?.name || "—"}
						</p>
						<p className="text-primary-red break-all">{user?.email}</p>
					</div>

					<div className="h-px bg-border-red/60" />

					{user?.profile ? (
						<div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 text-sm">
							<div>
								<p className="text-beige/50 font-shuriken tracking-wide">
									Roll Number
								</p>
								<p className="text-lg text-beige font-semibold">
									{user.profile.rollNumber}
								</p>
							</div>

							<div>
								<p className="text-beige/50 font-shuriken tracking-wide">
									Institution
								</p>
								<p className="text-lg text-beige font-semibold">
									{user.profile.institution}
								</p>
							</div>

							<div>
								<p className="text-beige/50 font-shuriken tracking-wide">
									Year
								</p>
								<p className="text-lg text-beige font-semibold">
									{user.profile.year}
								</p>
							</div>

							<div>
								<p className="text-beige/50 font-shuriken tracking-wide">
									Branch
								</p>
								<p className="text-lg text-beige font-semibold">
									{user.profile.branch}
								</p>
							</div>
						</div>
					) : (
						<p className="text-beige/60 italic">Profile not completed.</p>
					)}
				</div>
			</div>
		</div>
	);
}
